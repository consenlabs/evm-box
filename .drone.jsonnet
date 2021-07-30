local utils = import 'utils.jsonnet';
local repo = 'evm-box';
local namespace = 'biz';

[{
   kind: 'pipeline',
   name: repo,
   trigger: utils.default_trigger,
   volumes: utils.volumes(repo,["node"]),
   steps: utils.default_publish(repo) + [
     //deploy to develop
     utils.deploy('deploy-develop',
                  'dev',
                  namespace,
                  repo,
                  utils.adjust_deployment([
                    repo,
                  ], 'dev'),
                  { branch: ['feature/*','hotfix/*'], event: ["push"]}),

     //deploy to staging
     utils.deploy('deploy-staging',
                  'staging',
                  namespace,
                  repo,
                  utils.adjust_deployment([
                    repo,
                  ], 'staging'),
                  { branch: ['release/*' ], event: ["push"]}),
     utils.default_slack,
   ],
}] + utils.default_secrets
