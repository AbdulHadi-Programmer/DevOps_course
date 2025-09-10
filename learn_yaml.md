# How to learn this Step -by- step (CI/CD → Actions → YAML)

## Step 1: Understand CI/CD basics:
- **CI/CD = pipeline of stages:** Source → Build → Test → Deploy → Monitor.
- **Analogy:** like your cake story
- At this stage you don't write YAML, just learn concepts.
`✅ Goal: be able to answer — “What happens in Source, Build, Test, Deploy, Monitor?”`


# Step 2: Learn GitHub Actions (what, why, how)
* GitHub Actions = GitHub’s built-in CI/CD platform.
* Core ideas:
   - `Workflow` = one automation (YAML file inside .github/workflows/).
   - `Trigger (on:)` = when it runs (push, PR, manual, cron).
   - `Job` = a set of steps that run on a runner (VM).
   - `Step` = one action (uses prebuilt action) or shell command (run).
   - `Action` = reusable building block (actions/checkout, actions/setup-node, etc.).
`✅ Goal: understand the vocabulary of GitHub Actions.`

# Step 3 : Learn YAML Basics: 
- YAML is just a configuration format.
- Rules you need: 
   - Use spaces, not tabs
   - key-value: `key:value`
   - Lists:
      **steps:**
      `  - name: First`
      `    run: echo hello`
      `  - name: Second`
      `    run: echo world`
<!-- Comments start with # -->
* Practice writing small YAML workflows (like the "Hello World" or your Source Trigger Demo).
`✅ Goal: be comfortable writing a valid YAML workflow file.`


# Step 4: Map CI/CD stages → Actions YAML
Now you combine:

- Source = on: (push, PR).
- Build = jobs/steps to compile, lint, or build Docker image.
- Test = run unit/integration tests.
- Deploy = push image to Docker Hub / deploy to cloud.
- Monitor = notifications or integration with monitoring tools.
`✅ Goal: You can take a CI/CD diagram and express it as a GitHub Action workflow.`

# Step 5: Practice on your repo
- Start small (Source + Build + Test).
- Then expand with artifacts, Docker, deployments.
- Use your README’s examples as building blocks.

#  🗺️ So your learning flow should be:
1. CI/CD concepts (theory) → cake analogy you wrote.
2. GitHub Actions fundamentals → workflows, jobs, steps, runners.
3. YAML basics → formatting + writing files.
4. Build workflows for each stage → first Source (✅ you did this), then Build, Test, Deploy.
5. Full CI/CD pipeline → combine everything.>

## Learning Notes:
- runs-on: → defines  VM environment (Ubuntu, Windows, MacOS)
- `uses:`  vs `run:` :
   - **uses:** = calls a prebuilt Github Action (like checkout or setup-node)
   - **run:** = executes shell commands inside the runner VM.
- Artifacts → super useful if you want to pass build outputs (like a compiled binary or Docker Image) to the next-stage (Test/Deploy)


## Quick Exercise : 
1. Add this workflow to your repo.
2. Push a commit to main (or open a PR)
3. Go to Action Tab → click Build Stage Demo run.
4. Check:
   - Did it install Node and dependencies ?
   - Did it run lint/built?
   - Can you download the artifact (build-dist.zip)?

# =================================================
#                     10 Sep 2025
# =================================================

# Step 1 — Core Building Blocks
1. Workflow file location
  - Must be inside `.github/workflows/`
  - Each file = one workflow.
  - File Extension: `.yml` or `.yaml` 

2. **Workflow Structure :**
Every Github Action YAML has this skeleton :

```
name: My Workflow         # Display name in Actions tab

on:                       # Triggers
  push:
    branches: [main]
  pull_request:
  workflow_dispatch: {}

jobs:                     # Jobs to run
  job_name:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v4

      - name: Run command
        run: echo "Hello World"

```

3. **Triggers:**
- `push` → runs on branch pushes 
- `pull_request` → runs when a PR is opened/updated
- `workflow_dispatch` → allows manual run.

## Step 2 —— Jobs and Dependencies
- Workflows can have multiple jobs
- Jobs run in parallel by default
- Use `needs:` to make one job wait for another.

* Example:
```
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building app"

  deploy:
    runs-on: ubuntu-latest
    needs: build    # wait until build finishes
    steps:
      - run: echo "Deploying app"
```

# Step 3 —— Artifacts
Artifacts = files saved from one job → used in another.

```
- name: Upload artifact
  uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: dist/

- name: Download artifact
  uses: actions/download-artifact@v4
  with:
    name: build-output
```

# Step 4 —— Conditionals and Environments 
`Use` **if:** `to control when jobs/steps run.`
```
jobs:
  deploy_qa:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/dev'
    steps:
      - run: echo "Deploying to QA"
```

# Step 5 —— Matrix Strategy
Run tests across multiple environments.
```
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [16, 18, 20]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm test
```

# Step 6 —— Concurrency 
Prevent overlapping deploys:
```
concurrency:
    group: deploy-${{ github.ref }}
    cancel-in-progress: true
```

# Step 7 —— Notifications
You can call slack/Teamms via webhook at the end:
```
- name: Notify Slack
  run: curl -X POST -H 'Content-type: application/json' \
       --data '{"text":"✅ Production deploy finished"}' \
       ${{ secrets.SLACK_WEBHOOK_URL }}
```