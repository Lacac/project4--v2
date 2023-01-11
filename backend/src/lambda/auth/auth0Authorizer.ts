import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

// import { verify, decode } from 'jsonwebtoken'
import { verify} from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
// import Axios from 'axios'
// import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('auth')


// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
// const jwksUrl = 'https://dev-vz1vr01l.us.auth0.com/.well-known/jwks.json'


const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJcCwxkHwA35SIMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi12ejF2cjAxbC51cy5hdXRoMC5jb20wHhcNMjIxMDE3MDExOTI5WhcN
MzYwNjI1MDExOTI5WjAkMSIwIAYDVQQDExlkZXYtdnoxdnIwMWwudXMuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0t3PvSdnL7S/bvkn
OEs799R7C+WrPz223P11+qCeJCPgDP94yewzpMw3DOEonsc0SiPsJQOP3TRAQuz+
k17sjMGvWz9eYSVbVKIU29p3AXLYK/fbYRSBr+1shifNLDTidwdvWMu53bEZIfl2
6o+8cxVEFcYi6n62alxtrqIRMTmPh45WnWR+h/PocYBgOpW5orI5OhPGEXbwLaL4
gAUt/qRhojmNXF34YCZ/D3vRvkWgcIWqFe2BTvBXB/n+m0ouU9dnsZ9aBT1mRsC8
9+YX1qXmgQQU6e0SQShanZcbu5BbGoCGAkZtDq5+GuE72sJd8VA+kzX+BfE4qx3P
tzQT9wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQXvVB6FRIv
NgiX9AkC0+0gLgN9/DAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AHgs3tn9A+s7CoRA0UhZvPasrMWOtVqsyOXl/iYqk2hpWKYHX77BcuLj277EzX3m
P+8izakUa+pcf1xPXD7fEZi3Q02XfP03jHaewtDpZ8gdcnC4dSmGSP/SF0+8UZQM
Y6Ae7bmaAAzup/XElYJBQhadQ0gGTDVICDEIqxlvUTUIdoA+jxuWRrUPnTjwZOXP
E6jEeUr6pDd6j/Sj9EW1SUpsGk+kiPjxc09TI3RMzc8gYLNlxq0z9yhYgWMYuw7N
lwXvPLcBvvsrWDwDahcmCcaqRZ7/iLsMMRRQn6/i5FixAs8P49Yw69LaxYl+sTUP
8MPNuth66KtvoUTSNgE8upM=
-----END CERTIFICATE-----`

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {

  console.log('Auth event called', event)
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)
    
    return {
      principalId: jwtToken.sub,       // IAM policy in : Authentication - Implement a Custom Authorizer
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  
  // const jwt: Jwt = decode(token, { complete: true }) as Jwt

  // TODO: Implement token verification
  // You should implement it similarly to how it was implemented for the exercise for the lesson 5
  // You can read more about how to do this here: https://auth0.com/blog/navigating-rs256-and-jwks/

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtPayload
} 

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
