package main

import docker "github.com/fsouza/go-dockerclient"

func main() {
	client, _ := docker.NewClientFromEnv()
	imgs, _ := client.ListImages(docker.ListImagesOptions{All: false})
	for _, img := range imgs {
		println("ID: ", img.ID)
		println("Labels: ", img.Labels)
		for i, r := range img.RepoTags {
			println(i, ".RepoTags: ", r)
		}

		println("Created: ", img.Created)
		println("Size: ", img.Size)
		println("VirtualSize: ", img.VirtualSize)
		println("ParentId: ", img.ParentID)
	}
}
