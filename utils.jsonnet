local cache(name) = '/cache/' + name;

{
  shell(step_name, commands, environment={})::
   {
      name: step_name,
      image: 'alpine',
      commands: commands,
   },

  maven(step_name, commands, environment={}, version="3.6.3-jdk-8", cache_name="maven")::
    {
      name: step_name,
      image: 'maven:' + version,
      environment: {
        MAVEN_REPO: 'https://nexus.token.im/repository/im-group',
        MAVEN_USERNAME: { from_secret: 'mvn-username' },
        MAVEN_PASSWORD: { from_secret: 'mvn-password' },
      } + environment,
      commands: commands,
    },

  golang(step_name, commands, environment={}, version="1.13.8", cache_name="go")::
    {
      name: step_name,
      image: 'golang:' + version,
      environment: { GOPATH: cache(cache_name), GOCACHE: cache(cache_name+'-build') } + environment,
      commands: commands,
    },

  node(step_name, commands, environment={},  version="latest", cache_path="", cache_name="node")::
    {
      name: step_name,
      image: 'node:' + version,
      commands: commands,
    },

  rust(step_name, commands, environment={}, version="latest", cache_name="rust")::
   {
      name: step_name,
      image: 'rust:' + version,
      environment: { CARGO_HOME: cache(cache_name) + '/target/cache' } + environment,
      commands: commands,
   },

  adjust_deployment(deployment, env)::
    [x + '-' + env + ':' + x for x in deployment]
  ,

  publish(step_name, repo, when, tags=[], auto_tag=false, dockerfile="Dockerfile")::
    {
      name: step_name,
      image: 'plugins/docker',
      settings: {
        dockerfile: dockerfile,
        daemon_off: true,
        auto_tag: auto_tag,
        username: { from_secret: 'docker-username' },
        password: { from_secret: 'docker-password' },
        registry: 'registry.cn-hongkong.aliyuncs.com',
        repo: 'registry.cn-hongkong.aliyuncs.com/imtoken/' + repo,
        tags: tags,
      },
      when: when,
    },

  deploy(step_name, env, namespace, repo, deployment, when, tag='${DRONE_COMMIT_SHA:0:8}'):: {
    name: step_name,
    image: 'registry.cn-hongkong.aliyuncs.com/imtoken/drone-k8s:latest',
    settings: {
      kubernetes_server: { from_secret: 'gcp-server-' + env },
      kubernetes_token: { from_secret: 'gcp-token-' + env },
      namespace: namespace,
      repo: 'registry.cn-hongkong.aliyuncs.com/imtoken/' + repo,
      tag: tag,
      deployment: deployment,
    },
    when: when,
  },

  default_slack: {
    name: 'slack',
    image: 'plugins/slack',
    when: { status: ['success', 'failure'] },
    settings: {
      webhook: { from_secret: "drone-slack" },
      template: |||
        {{#if build.pull }}
        *{{#success build.status}}✔{{ else }}✘{{/success}} {{ uppercasefirst build.status }}*: <https://github.com/{{ repo.owner }}/{{ repo.name }}/pull/{{ build.pull }}|Pull Request #{{ build.pull }}>
        {{else}}
        *{{#success build.status}}✔{{ else }}✘{{/success}} {{ uppercasefirst build.status }}: Build #{{ build.number }}* (type: `{{ build.event }}`)
        {{/if}}
        Commit: {{ build.message.title }}(<https://github.com/{{ repo.owner }}/{{ repo.name }}/commit/{{ build.commit }}|{{ truncate build.commit 8 }}>)
        {{#if build.tag }}
        Tag: <https://github.com/{{ repo.owner }}/{{ repo.name }}/commits/{{ build.tag }}|{{ repo.name }} {{ build.tag }}>
        {{else}}
        Branch: <https://github.com/{{ repo.owner }}/{{ repo.name }}/commits/{{ build.branch }}|{{ repo.name }} {{ build.branch }}>
        {{/if}}
        Author: {{ build.author }}
        <{{ build.link }}|Visit build page ↗>
      |||,
    },
  },

  volumes(repo, cache_names = ["node", "golang", "rust", "maven"]): [],

  default_publish(repo, dockerfile="Dockerfile")::
    [
      self.publish('publish-on-develop-' + repo,
                   repo,
                   { branch: ['hotfix/*', 'feature/*', 'support/*'] },
                   ['${DRONE_COMMIT_SHA:0:8}'],
                   dockerfile = dockerfile),
      self.publish('publish-on-release-' + repo,
                   repo,
                   { branch: ['release/*'] },
                   ['${DRONE_COMMIT_SHA:0:8}', 'staging'],
                   dockerfile = dockerfile),
      self.publish('publish-on-stable-branch-' + repo,
                   repo,
                   { branch: ['develop', 'master'] },
                   ['${DRONE_COMMIT_SHA:0:8}', '${DRONE_COMMIT_BRANCH}', '${DRONE_COMMIT_BRANCH}-${DRONE_COMMIT_SHA:0:8}'],
                   dockerfile = dockerfile),
      self.publish('publish-on-tag-' + repo,
                   repo,
                   { event: ['tag'] },
                   auto_tag = true,
                   dockerfile = dockerfile),
    ],

  default_trigger: {
    ref: ['refs/heads/develop', 'refs/heads/master', 'refs/heads/hotfix/*', 'refs/heads/feature/*', 'refs/heads/support/*', 'refs/heads/release/*', 'refs/tags/*'],
    event: ['push', 'tag'],
  },

  default_secrets: [
    {
      kind: 'secret',
      name: 'gcp-bucket-sa',
      get: {
        path: 'drone-gcp-sa-secrets',
        name: 'sa',
      },
    },

    {
      kind: 'secret',
      name: 'docker-username',
      get: {
        path: 'image-registry-aliyun',
        name: 'username',
      },
    },

    {
      kind: 'secret',
      name: 'docker-password',
      get: {
        path: 'image-registry-aliyun',
        name: 'password',
      },
    },

    {
      kind: 'secret',
      name: 'gcp-server-dev',
      get: {
        path: 'drone-kubeconfig-gcp-dev',
        name: 'server',
      },
    },

    {
      kind: 'secret',
      name: 'gcp-token-dev',
      get: {
        path: 'drone-kubeconfig-gcp-dev',
        name: 'token',
      },
    },

    {
      kind: 'secret',
      name: 'gcp-server-staging',
      get: {
        path: 'drone-kubeconfig-gcp-staging',
        name: 'server',
      },
    },

    {
      kind: 'secret',
      name: 'gcp-token-staging',
      get: {
        path: 'drone-kubeconfig-gcp-staging',
        name: 'token',
      },
    },

    {
      kind: 'secret',
      name: 'drone-slack',
      get: {
        path: 'drone-slack-secrets',
        name: 'slack_webhook',
      },
    },

    {
      kind: 'secret',
      name: 'mvn-username',
      get: {
        path: 'drone-mvn-secrets',
        name: 'username',
      },
    },

    {
      kind: 'secret',
      name: 'mvn-password',
      get: {
        path: 'drone-mvn-secrets',
        name: 'password',
      },
    },
  ],
}
