import proxy from "express-http-proxy"

 const proxyWithHeader=(serviceUrl)=>{
    return proxy(serviceUrl,{
        proxyReqOptDecorator:(proxyReqOpts,srcReq)=>{
            if(srcReq){
            proxyReqOpts.headers["x-user-id"]=srcReq.user.userId
        }}
    })
}

export default proxyWithHeader
