package main

import (
	"container-manager-server/controller"
	"github.com/kataras/iris"
	"github.com/kataras/iris/middleware/logger"
	"github.com/kataras/iris/mvc"
)

func main() {
	app := iris.New()
	app.Logger().SetLevel("debug")
	app.Use(logger.New())

	m := mvc.New(app.Party("/"))
	m.Party("/image").Handle(new(controller.Image))
	m.Party("/container").Handle(new(controller.Container))

	app.Run(iris.Addr(":8080"), iris.WithoutServerError(iris.ErrServerClosed))
}
