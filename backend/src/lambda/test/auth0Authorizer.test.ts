import 'mocha'
import 'chai-http'
import * as lambdaTester from 'lambda-tester'
import * as chai from 'chai'

chai.use(require('chai-http'))

import {handler} from '../auth/auth0Authorizer'

describe('Auth function',() => {
    it('it verify the token', async() => {
        await lambdaTester(handler)
            .event(
                {
                    authorizationToken: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNOdnMwdUFHSl9XMUhESGdNZ05MMiJ9.eyJpc3MiOiJodHRwczovL2Rldi12ejF2cjAxbC51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU4NzgyNDczOTQyMDExODk4MTYiLCJhdWQiOiJjYnlDQldXUXBtaWJpdzBHVEcyY0RBejl5cFFqdW1ZWiIsImlhdCI6MTY3MzQxODg4OCwiZXhwIjoxNjczNDU0ODg4LCJhdF9oYXNoIjoiVVNKZ0M5X0J5SmFEYXQ5bDFwWXRtQSIsInNpZCI6ImMtTUJhR0laYjZGbWtOUHBXdnVWWXhFSDlrTGctRC1UIiwibm9uY2UiOiJoUTZjQ1ZUY0NiazIyb0c2M2swMnhaMm1WeXg0VkcuayJ9.Iz4NVMKmGwAIg0QrOplelUEqBGsFB_dAQy7Ac5mDjPtQndLeyQ_1zeAM9j9TUeOoTWrfboG2iToIzYcIgSgyg42sIKdQE9YL4bp9qwtEf1e07kwmwGOamVpZOSyff2y4En7DlMMngpQxZ_GvT2yTdudgWNGCnGggz_4FutZWZt8PZpnFzd29zAy0841RXF7e4ssB09sMvWc1kdJHi6LEKgWWN1ThEt7_37A5Ei018mzlgFRIDVfuzxufcJfEKipuVgyDJH9xmhdXOzhMR8lVsLt0DHx-jW7mOxObvmxqvjlzVQ08np_IC0j4bR6ZMOgVVC2C12JL10E4a4oDe_1Dpw'

                    //      authorizationToken: '123456'
                }
                )
                .expectResult((result) => {
                    console.log(result)
                    chai.expect(result.policyDocument.Statement[0].Effect).to.equal('Allow')
                })
    })

    it('it verify the wrong token', async() => {
        await lambdaTester(handler)
            .event(
                {
                    authorizationToken: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNOdnMwdUFHSl9XMUhESGdNZ05MMiJ9.eyJpc3MiOiJodHRwczovL2Rldi12ejF2cjAxbC51cy5hdXRo'
                    //      authorizationToken: '123456'
                }
                )
                .expectResult((result) => {
                    console.log(result)
                    chai.expect(result.policyDocument.Statement[0].Effect).to.equal('Deny')
                })
    })




})