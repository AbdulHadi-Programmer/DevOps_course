## Learning CI / CD Pipeline and How it is Built ?
# What is CI (Continuous Integrations) :
Developer merge (integrate) code often into the main branch. Automated checks (build + tests) runs every time.

# What is CD = Continuous Delievery / Continuous Deployment
Once code passes CI, it gets delivered to environments (staging, production).
* Delivery → requires human approval before production.
* Deployment → goes live automatically.
Think of CI/CD as an assembly line for software.

# The Stages of a Pipeline
Every pipeline has roughly these parts:
1. Source  → code pushed to Git.
2. Build → compile, package, or containerize.
3. Test → run unit, integration, and e2e tests.
4. Deploy → move to staging or production.
5. Monitor → collect logs, metrics, feedback.
