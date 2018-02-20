import { Validator } from 'jsonschema';

export default function (requestBody) {
  const validator = new Validator();

  const schema = {
    properties: {
      companyName: { type: 'string', pattern: /^\S{3,}$/ },
      advs: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            advType: {
              type: 'string',
              enum: ['classic', 'standout', 'premium']
            },
            jobRole: {
              type: 'string'
            },
            jobDescription: {
              type: 'string'
            }
          },
          required: ['advType']
        }
      }
    },
    required: ['companyName']
  };

  const errors = validator.validate(requestBody, schema).errors;

  return errors.map(error => ({
    message: error.stack
  }));
}