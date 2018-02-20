import { expect } from 'chai';
import request from 'supertest';
import proxyquire from 'proxyquire';
import purchaseAdvBuilder from '../utilities/purchaseAdvBuilder';
import serverConfig from '../serverConfig';

describe('purchaseAdv api', () => {
  let app;

  before(function () {
    const mockConfig = {
      '@global': true,
      ...serverConfig
    };

    app = proxyquire('../app', {
      '../serverConfig': mockConfig
    }).default;
  });

  async function postPurchaseAdv(data) {
    return request(app)
      .post('/api/purchaseAdv')
      .set('Accept', 'application/json')
      .send(data);
  }

  describe('calling purchaseAdv api', () => {
    let response;

    describe('error occur', () => {
      describe('When the data is invalid', () => {
        const scenarios = {
          'companyName': [
            { setup: b => b.withCompanyName(12345), expectedErrors: ['instance.companyName is not of a type(s) string'] },
            { setup: b => b.withCompanyName(''), expectedErrors: ['instance.companyName does not match pattern {}'] },
            { setup: b => b.withCompanyName(), expectedErrors: ['instance requires property "companyName"'] }
          ],
          'advs': [
            { setup: b => b.withAdvs(12345), expectedErrors: ['instance.advs is not of a type(s) array'] },
            { setup: b => b.withAdvs(''), expectedErrors: ['instance.advs is not of a type(s) array'] }
          ],
          'advs.advType': [
            { setup: b => b.withAdvType(123), expectedErrors: ['instance.advs[0].advType is not of a type(s) string', 'instance.advs[0].advType is not one of enum values: classic,standout,premium'] },
            { setup: b => b.withAdvType('123'), expectedErrors: ['instance.advs[0].advType is not one of enum values: classic,standout,premium'] },
            { setup: b => b.withAdvType(undefined), expectedErrors: ['instance.advs[0] requires property "advType"'] },
            { setup: b => b.withAdvType(), expectedErrors: ['instance.advs[0] requires property "advType"'] }
          ],
          'advs.jobRole': [
            { setup: b => b.withJobRole(123), expectedErrors: ['instance.advs[0].jobRole is not of a type(s) string'] }
          ],
          'advs.jobDescription': [
            { setup: b => b.withJobDescription(123), expectedErrors: ['instance.advs[0].jobDescription is not of a type(s) string'] }
          ]
        };

        for (const propertyName in scenarios) {
          describe(propertyName, () => {
            for (const test of scenarios[propertyName]) {
              const expectedErrors = test.expectedErrors;
              const setup = test.setup;

              it(`returns  ${expectedErrors.join(', ')} if invalid`, async () => {
                const entity = setup(new purchaseAdvBuilder()).entity;
                const result = await postPurchaseAdv(entity);

                expect(result.body).to.deep.equal({ errors: expectedErrors.map(msg => ({ message: msg })) });
              });
            }
          });
        }
      });
    });

    describe('and no error occur', () => {
      describe('company with default package', () => {
        before(async () => {
          response = await postPurchaseAdv(new purchaseAdvBuilder().entity);
        });

        it('returns a 200 http response', () => {
          expect(response.status).to.eq(200);
        });

        it('returns grand total value', () => {
          expect(response.body).to.deep.equal({ 'grandTotal': 987.97 });
        });
      });
      describe('company with bundle package', () => {
        before(async () => {
          response = await postPurchaseAdv(new purchaseAdvBuilder('bundle').entity);
        });

        it('returns a 200 http response', () => {
          expect(response.status).to.eq(200);
        });

        it('returns grand total value', () => {
          expect(response.body).to.deep.equal({ 'grandTotal': 1349.95 });
        });
      });
      describe('company with cheaperForMore package', () => {
        before(async () => {
          response = await postPurchaseAdv(new purchaseAdvBuilder('cheaperForMore').entity);
        });

        it('returns a 200 http response', () => {
          expect(response.status).to.eq(200);
        });

        it('returns grand total value', () => {
          expect(response.body).to.deep.equal({ 'grandTotal': 1519.96 });
        });
      });
      describe('company with specialPrice package', () => {
        before(async () => {
          response = await postPurchaseAdv(new purchaseAdvBuilder('specialPrice').entity);
        });

        it('returns a 200 http response', () => {
          expect(response.status).to.eq(200);
        });

        it('returns grand total value', () => {
          expect(response.body).to.deep.equal({ 'grandTotal': 599.98 });
        });
      });
      describe('company with all package', () => {
        before(async () => {
          response = await postPurchaseAdv(new purchaseAdvBuilder('allInOne').entity);
        });

        it('returns a 200 http response', () => {
          expect(response.status).to.eq(200);
        });

        it('returns grand total value', () => {
          expect(response.body).to.deep.equal({ 'grandTotal': 2949.91 });
        });
      });
    });

  });
});