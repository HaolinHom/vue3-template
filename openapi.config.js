const { generateService } = require('@yourenz/umijs-openapi');

function formatName(name) {
  return name.replace(/-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

const swaggerConfig = [
  {
    // TIPS: 在此处添加需要的接口
    schemaPath: '',
    projectName: 'swagger',
    // TIPS: 在此处添加需要的Controller
    include: [],
  },
];

swaggerConfig.forEach((config) => {
  generateService({
    serversPath: './src/api',
    requestLibPath: '@/utils/request',
    ...config,
    hook: {
      customFunctionName(data) {
        const method = data.method;
        const meta = data.path;
        if (meta) {
          const metaArr = meta
            .substr(1)
            .split('/')
            .filter((v) => !!v)
            .map((v) => {
              const params = v.match(/^{(.*?)}$/);
              const format = formatName(v);
              return params
                ? `$${params[1]}`
                : `${format[0].toUpperCase()}${format.substr(1)}`;
            });

          return `${method.toUpperCase()}${metaArr.join('')}`;
        } else {
          return data.operationId;
        }
      },
    },
  });
});
