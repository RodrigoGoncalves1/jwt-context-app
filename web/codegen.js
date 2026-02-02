var config = {
    schema: './schema.graphql',
    documents: ['src/graphql/**/*.graphql'],
    generates: {
        './src/generated/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                withHooks: true,
                withHOC: false,
                withComponent: false,
                scalars: {
                    DateTime: 'string',
                    EmailAddress: 'string',
                },
            },
        },
    },
    ignoreNoDocuments: true,
};
export default config;
