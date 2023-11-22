import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator(
    (key: string, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest() 
        return key? request?.[key] : request.user
    }
)
