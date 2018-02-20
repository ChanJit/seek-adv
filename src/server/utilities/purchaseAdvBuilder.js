export const TEMPLATE_OPTIONS = {
  default: 'default',
  bundle: 'bundle',
  cheaperForMore: 'cheaperForMore',
  specialPrice: 'specialPrice',
  allInOne: 'allInOne'
};

const templates = {
  default: () => ({
    companyName: 'windows',
    advs: [
      {
        advType: 'classic',
        jobRole: 'programmer',
        jobDescription: 'create website'
      }, {
        advType: 'standout',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'premium',
        jobRole: 'programmer',
        jobDescription: 'create database'
      }
    ]
  }),
  bundle: () => ({
    companyName: 'unilever',
    advs: [
      {
        advType: 'classic',
        jobRole: 'barista',
        jobDescription: 'make coffee'
      }, {
        advType: 'classic',
        jobRole: 'barista',
        jobDescription: 'make coffee'
      }, {
        advType: 'classic',
        jobRole: 'barista',
        jobDescription: 'make coffee'
      }, {
        advType: 'classic',
        jobRole: 'barista',
        jobDescription: 'make coffee'
      }, {
        advType: 'classic',
        jobRole: 'barista',
        jobDescription: 'make coffee'
      }, {
        advType: 'classic',
        jobRole: 'barista',
        jobDescription: 'make coffee'
      }, {
        advType: 'classic',
        jobRole: 'barista',
        jobDescription: 'make coffee'
      }
    ]
  }),
  cheaperForMore: () => ({
    companyName: 'nike',
    advs: [
      {
        advType: 'premium',
        jobRole: 'programmer',
        jobDescription: 'create website'
      }, {
        advType: 'premium',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'premium',
        jobRole: 'programmer',
        jobDescription: 'create database'
      }, {
        advType: 'premium',
        jobRole: 'programmer',
        jobDescription: 'create database'
      }
    ]
  }),
  specialPrice: () => ({
    companyName: 'apple',
    advs: [
      {
        advType: 'standout',
        jobRole: 'programmer',
        jobDescription: 'create website'
      }, {
        advType: 'standout',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }
    ]
  }),
  allInOne: () => ({
    companyName: 'ford',
    advs: [
      {
        advType: 'classic',
        jobRole: 'programmer',
        jobDescription: 'create website'
      }, {
        advType: 'standout',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'premium',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'classic',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'premium',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'classic',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'premium',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'classic',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'premium',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }, {
        advType: 'classic',
        jobRole: 'programmer',
        jobDescription: 'create mobile app'
      }
    ]
  })
};

export default class UserBuilder {
  constructor(templateId = 'default') {
    this.entity = templates[templateId]();
  }

  withCompanyName(companyName) {
    return (this.entity.companyName = companyName, this);
  }

  withAdvs(advs) {
    return (this.entity.advs = advs, this);
  }

  withAdvType(advType) {
    return (this.entity.advs[0].advType = advType, this);
  }

  withJobRole(jobRole) {
    return (this.entity.advs[0].jobRole = jobRole, this);
  }

  withJobDescription(jobDescription) {
    return (this.entity.advs[0].jobDescription = jobDescription, this);
  }
}