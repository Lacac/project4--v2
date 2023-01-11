import 'mocha'
import 'chai-http'
import * as lambdaTester from 'lambda-tester'
import * as chai from 'chai'

chai.use(require('chai-http'))

import {handler} from '../http/createTodo'

describe('Create Todo',() => {
    it('it should CREATE a TodoItems', async() => {
        await lambdaTester(handler)
            .event(
                {
                    body : '{"name": "Water flowers","dueDate": "2019-06-11"}',
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNOdnMwdUFHSl9XMUhESGdNZ05MMiJ9.eyJpc3MiOiJodHRwczovL2Rldi12ejF2cjAxbC51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU4NzgyNDczOTQyMDExODk4MTYiLCJhdWQiOiJjYnlDQldXUXBtaWJpdzBHVEcyY0RBejl5cFFqdW1ZWiIsImlhdCI6MTY3MzI0NjkwNCwiZXhwIjoxNjczMjgyOTA0LCJhdF9oYXNoIjoicjZfYWprT1hhSXEzaTdXb24zTDhIZyIsInNpZCI6ImMtTUJhR0laYjZGbWtOUHBXdnVWWXhFSDlrTGctRC1UIiwibm9uY2UiOiJ4SXBlelFNQ2xtaVFuczN1MmNUN1pCRFNuSDJWWFY4dSJ9.QaXyojMqhUiORXTdZZgfOfaSwo-3ReAcOos4vLNkK9GM9ELxb51O8by1gGbdaW1E3pgGvM4K229lQodgzXfFlcWBGlUv3W9A3BaknAfe3ZZbNdaB17BR5Z7rdOhd_4g-cYKUGuc1_5aRUjAIS2E7ra5LTSkLjbAPaWYwfb6KtwOBPbEHH-mQMcKtmU_jhW5xEN7fWy_hKgJxYD9d-nFJPkoDRMK0pZ8bnIEBu5QUw-z_58Wx9LISQ1utK93YzxXVNU_BWC4a_qQw24mI_wE7h0NaVUkyvTrMX5TYHM3fWJ6g4YXogc7fzZ0dp_CvwaVOtxajzH81V1zsLBkeDlkPxg'
                    }
                }
                )
                .expectResult((result) => {
                    chai.expect(result.statusCode).to.equal(201)
                })
    })
    // it('it should not CREATE a TodoItems', async() => {
    //     await lambdaTester(handler)
    //         .event(
    //             {
    //                 body : '{"dueDate": "2019-06-11"}',
    //                 headers: {
    //                     Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNOdnMwdUFHSl9XMUhESGdNZ05MMiJ9.eyJpc3MiOiJodHRwczovL2Rldi12ejF2cjAxbC51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU4NzgyNDczOTQyMDExODk4MTYiLCJhdWQiOiJjYnlDQldXUXBtaWJpdzBHVEcyY0RBejl5cFFqdW1ZWiIsImlhdCI6MTY3MzI0NjkwNCwiZXhwIjoxNjczMjgyOTA0LCJhdF9oYXNoIjoicjZfYWprT1hhSXEzaTdXb24zTDhIZyIsInNpZCI6ImMtTUJhR0laYjZGbWtOUHBXdnVWWXhFSDlrTGctRC1UIiwibm9uY2UiOiJ4SXBlelFNQ2xtaVFuczN1MmNUN1pCRFNuSDJWWFY4dSJ9.QaXyojMqhUiORXTdZZgfOfaSwo-3ReAcOos4vLNkK9GM9ELxb51O8by1gGbdaW1E3pgGvM4K229lQodgzXfFlcWBGlUv3W9A3BaknAfe3ZZbNdaB17BR5Z7rdOhd_4g-cYKUGuc1_5aRUjAIS2E7ra5LTSkLjbAPaWYwfb6KtwOBPbEHH-mQMcKtmU_jhW5xEN7fWy_hKgJxYD9d-nFJPkoDRMK0pZ8bnIEBu5QUw-z_58Wx9LISQ1utK93YzxXVNU_BWC4a_qQw24mI_wE7h0NaVUkyvTrMX5TYHM3fWJ6g4YXogc7fzZ0dp_CvwaVOtxajzH81V1zsLBkeDlkPxg'
    //                 }
    //             }
    //             )
    //             .expectResult((result) => {
    //                 chai.expect(result.statusCode).to.equal(400)
    //             })
    // })


})
