import 'mocha'
import 'chai-http'
import * as lambdaTester from 'lambda-tester'
import * as chai from 'chai'

chai.use(require('chai-http'))

import {handler} from '../http/deleteImage'

describe('delete Image',() => {
    it('it should DELETE an image Todo', async() => {
        await lambdaTester(handler)
            .event(
                {
                    pathParameters: { todoId: 'e610bd33-a178-4357-a5c2-e91d2d82d95f' },
                }
                )
                .expectResult((result) => {
                    chai.expect(result.statusCode).to.equal(204)
                })
    })
})