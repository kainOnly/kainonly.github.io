package main

import (
	"container-manager-server/controller"
	"github.com/kataras/iris"
	"github.com/kataras/iris/middleware/logger"
)

func main() {
	App := iris.New()
	App.Logger().SetLevel("debug")
	App.Use(logger.New())

	Image := new(controller.Image)
	ImageRouter := App.Party("/image")
	{
		ImageRouter.Get("/lists", Image.ListsEndPoint)
	}

	Container := new(controller.Container)
	ContainerRouter := App.Party("/container")
	{
		ContainerRouter.Get("/lists", Container.ListsEndPoint)
	}

	App.Run(iris.Addr(":8080"), iris.WithoutServerError(iris.ErrServerClosed))
}
