# 🪜 Phase 1 — Foundations (YAML + GitHub Actions Basics)
* 🎯 Goal

Get comfortable with YAML syntax, GitHub Actions basics, and running simple automation.

# 📌 Step 1: YAML Fundamentals
👉 Practice YAML outside of GitHub first, so indentation & structure feel natural.

Learn: 
`Key-value pairs:`

name: DevOps Master
level: beginner

`Lists:`
skills:
  - CI/CD
  - Docker
  - Kubernetes 

`Nested Structures:`
student:
  name: Hadi
  goals: 
    - master CI/CD
    - learn Kubernetes

- Comments:
# This is a comment
- Anchors and Alliases (advanced):
default: &default
  runs-on: ubuntu-latest
  timeout-minutes: 10

job1:
  <<: *defaults

* My First Github Workflow
Create .github/workflows/hello.yml


# 2️⃣ Python Script with Artifact
<!-- Have a Python script generate.py: -->
