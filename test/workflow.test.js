import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const WORKFLOW_PATH = path.resolve('.github/workflows/deploy-pages.yml')

function parseYaml(filePath) {
  // Use python3's yaml parser to reliably parse YAML to JSON
  const output = execFileSync('python3', [
    '-c',
    'import sys, json, yaml; print(json.dumps(yaml.safe_load(open(sys.argv[1]))))',
    filePath,
  ], { encoding: 'utf8' })
  return JSON.parse(output)
}

test('Seam 1: GitHub Pages workflow file exists', () => {
  assert.equal(fs.existsSync(WORKFLOW_PATH), true, 'Workflow file .github/workflows/deploy-pages.yml must exist')
})

test('Seam 1: GitHub Pages workflow structure and configurations match requirements', () => {
  assert.equal(fs.existsSync(WORKFLOW_PATH), true)
  const workflow = parseYaml(WORKFLOW_PATH)

  // 1. Triggers
  assert.ok(workflow.on, 'Workflow must define "on" triggers')
  assert.ok(workflow.on.push || workflow.on.push === null, 'Workflow must trigger on push')
  assert.ok(
    'workflow_dispatch' in workflow.on,
    'Workflow must trigger on workflow_dispatch'
  )

  const pushBranches = workflow.on.push?.branches || []
  assert.ok(
    pushBranches.includes('main') || pushBranches.includes('master'),
    'Push trigger must include main/master branch'
  )

  // 2. Permissions
  assert.ok(workflow.permissions, 'Workflow must define permissions')
  assert.equal(workflow.permissions.contents, 'read', 'contents permission must be read')
  assert.equal(workflow.permissions.pages, 'write', 'pages permission must be write')
  assert.equal(workflow.permissions['id-token'], 'write', 'id-token permission must be write')

  // 3. Concurrency
  assert.ok(workflow.concurrency, 'Workflow must define concurrency')
  assert.equal(workflow.concurrency.group, 'pages', 'concurrency group must be pages')
  assert.equal(workflow.concurrency['cancel-in-progress'], false, 'cancel-in-progress must be false')

  // 4. Build job
  const jobs = workflow.jobs
  assert.ok(jobs, 'Workflow must define jobs')
  assert.ok(jobs.build, 'Workflow must define build job')

  const buildSteps = jobs.build.steps || []
  const hasLockfileInstall = buildSteps.some((step) =>
    typeof step.run === 'string' && step.run.includes('npm ci')
  )
  assert.ok(hasLockfileInstall, 'Build job must install dependencies deterministically via "npm ci"')

  const hasNpmBuild = buildSteps.some((step) =>
    typeof step.run === 'string' && step.run.includes('npm run build')
  )
  assert.ok(hasNpmBuild, 'Build job must run "npm run build"')

  const hasUploadPagesArtifact = buildSteps.some((step) => {
    const uses = step.uses || ''
    const withPath = step.with?.path || ''
    return uses.includes('actions/upload-pages-artifact') && (withPath === 'dist' || withPath === './dist' || withPath === 'dist/')
  })
  assert.ok(hasUploadPagesArtifact, 'Build job must use official actions/upload-pages-artifact with path dist')

  // 5. Deploy job
  assert.ok(jobs.deploy, 'Workflow must define deploy job')
  assert.equal(jobs.deploy.needs, 'build', 'Deploy job must depend on build job')
  assert.ok(
    jobs.deploy.environment === 'github-pages' || jobs.deploy.environment?.name === 'github-pages',
    'Deploy job must deploy to github-pages environment'
  )

  const deploySteps = jobs.deploy.steps || []
  const hasDeployPages = deploySteps.some((step) =>
    (step.uses || '').includes('actions/deploy-pages')
  )
  assert.ok(hasDeployPages, 'Deploy job must use official actions/deploy-pages action')

  // 6. Generic and repo-agnostic (no hardcoded repo name)
  const fileContent = fs.readFileSync(WORKFLOW_PATH, 'utf8')
  assert.equal(fileContent.includes('06-my-approach-in-the-age-of-agents'), false, 'Workflow must not hardcode repository name')
})
