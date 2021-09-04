const files=require('fs')
const http = require("http")
const port=3000
const server=http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'})
    files.readFile("index.html",(error,data)=>{
        if (error){
            res.writeHead(404)
            res.write("Error file not found")
        }else{
            res.write(data)
            res.end()
        }
    })
})

server.listen(port,function(error){
if (error){
    console.log("something went wrong",error)

}else{
    console.log("server has started and listening"+port)
}
})
