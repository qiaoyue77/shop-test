module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                "assets":"@/assets",
                "components":"@/components",
                "views":"@/views",
                "network":"@/network",
                "utils":"@/utils"
            }
        }
    },
    lintOnSave: false,
    devServer: {
        port: 8001,
        overlay: {

            warning: false,

            errors: false

        }
    }
}