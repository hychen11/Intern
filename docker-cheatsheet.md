# docker-cheatsheet

Reference: https://github.com/wsargent/docker-cheat-sheet  
Youtube Tutorial: [Docker Tutorial for Beginners](https://www.youtube.com/watch?v=fqMOX6JJhGo&list=RDCMUC8butISFwT-Wl7EV0hUK0BQ&start_radio=1&t=18)  
Qwiklab Walkthrough: [Introduction to Docker](https://www.qwiklabs.com/focuses/1029?parent=catalog)

## Image
Images are just templates for docker containers.
* [`docker build`](https://docs.docker.com/engine/reference/commandline/build) creates image from Dockerfile.
```
docker build .                  (random name, default tag)
docker build node-app .         (default tag)
docker build -t node-app:0.1 .
```
The ```-t``` is to name and tag an image with the ```name:tag``` syntax. The ```name``` of the image is node-app and the ```tag``` is 0.1. If you don't specify a tag, the tag will default to ```latest```. Same image tagged with different names have same image ID.  
The ```.``` means current directory so you need to run this command from within the directory that has the Dockerfile.

* [`docker rmi`](https://docs.docker.com/engine/reference/commandline/rmi) removes an image.
```
docker rmi node-app:0.1             (use -f to force the deletion)
docker rmi $(docker images -aq)     (remove remaining images)
```
Child images should be removed before parent images can be removed.
* [`docker images`](https://docs.docker.com/engine/reference/commandline/images) shows all images.
* [`docker commit`](https://docs.docker.com/engine/reference/commandline/commit) creates image from a container, pausing it temporarily if it is running.
* [`docker tag`](https://docs.docker.com/engine/reference/commandline/tag) tags an image to a name (local or registry).

## Container
Your basic isolated Docker process.  
* [`docker run`](https://docs.docker.com/engine/reference/commandline/run) creates and starts a container in one operation.
```
docker run hello-world
docker run --name my-container node-app:v0.1
docker run -p 4000:80 node-app:0.1

docker run -it node-app:0.1                     (if it's python program, will open a python shell)
docker run -it node-app:0.1 bash                (run image, bash into the environment, can see all files)
docker exec -it my-container bash               (create a new bash session in the container )
```
The ```--name``` names the container. Otherwise it will randomly generate a container name.  
The ```-p``` instructs Docker to map the host's port 4000 to the container's port 80.  
The ```-d``` flag makes the container run in the background (not tied to the terminal's session).  

The ```-it``` allocates a pseudo-TTY connected to the container’s stdin, creating an interactive bash shell in the container.  
The ```docker exec -it [container_id] bash``` will create a new Bash session in the container.  
Bash ran in the WORKDIR directory (/app) specified in the Dockerfile. 

* [`docker rm`](https://docs.docker.com/engine/reference/commandline/rm) deletes a container.
```
docker rm my-container               
docker rm $(docker ps -aq)           (remove all containers)         
```
* [`docker stop`](https://docs.docker.com/engine/reference/commandline/stop) stops a running container.
```
docker stop my-container
docker stop $(docker ps -q)          (stop all containers)
```
* [`docker ps`](https://docs.docker.com/engine/reference/commandline/ps) shows running containers, use `-a` to show all running and stopped containers.
* [`docker create`](https://docs.docker.com/engine/reference/commandline/create) creates a container but does not start it.
* [`docker start`](https://docs.docker.com/engine/reference/commandline/start) starts a container so it is running.


## Registry
A [Docker registry](https://docs.docker.com/get-started/overview/#docker-registries) stores Docker images. Docker Hub is a public registry that anyone can use, and Docker is configured to look for images on Docker Hub by default.   

* [`docker login`](https://docs.docker.com/engine/reference/commandline/login) to login to a registry, use `--username` or `-u` to specify username.
* [`docker logout`](https://docs.docker.com/engine/reference/commandline/logout) to logout from a registry.
* [`docker pull`](https://docs.docker.com/engine/reference/commandline/pull) pulls an image from registry. If no tag is provided, Docker Engine uses the :latest tag as a default.
* [`docker push`](https://docs.docker.com/engine/reference/commandline/push) pushes an image to the registry from local machine.

### Example: [Pull an official image](https://docs.docker.com/engine/reference/commandline/pull/#pull-an-image-from-docker-hub)
These commands pull the debian:latest and debian:jessie images from Docker Hub.  
```
$ docker pull debian
$ docker pull debian:jessie
```
debian:jessie image shares layers with debian:latest. Pulling debian:jessie only pulls its metadata, but not its layers.  
Also they have the **same image ID** because they are the same image tagged with different names.  

### Example: [Push an image to a registry](https://docs.docker.com/engine/reference/commandline/push/#push-a-new-image-to-a-registry)
First save the new image by finding the container ID (using docker container ls) and then committing it to a new image name.
```
$ docker container commit c16378f943fe rhel-httpd:latest
```
Now, push the image to the registry using the image ID. In this example the registry is on host named registry-host and listening on port 5000. To do this, tag the image with the host name or IP address, and the port of the registry:  
```
$ docker image tag rhel-httpd:latest registry-host:5000/myadmin/rhel-httpd:latest
$ docker image push registry-host:5000/myadmin/rhel-httpd:latest
```
Running ```docker images```, you should see both rhel-httpd and registry-host:5000/myadmin/rhel-httpd listed. 

### Example: [Push/Pull to/from Docker Hub](https://github.com/yueyang0115/docker-deploy/blob/main/README.md#push-to-docker-hub)
**Push to Docker Hub**  
Create a new repository on DockerHub.  
Login to DockerHub via ```docker login``` on your local computer.  
Tag your image with hostname and tag-name. Push it to using format ```yueyang0115/[repo-name]:[tag-name]```.  
```
docker tag my-app:v1 yueyang0115/dukeproj:v1
docker push yueyang0115/dukeproj:v1
```
**Pull from Docker Hub**  
```
docker pull yueyang0115/dukeproj:v1
```

### Example: [Push/Pull an image to/from Google Container Registry](https://www.qwiklabs.com/focuses/1029?parent=catalog#step8)
To ***push images***, tag the images with a registry name using format ```[hostname]/[project-id]/[image]:[tag]```.  
You can find your project ID by running ```gcloud config list project```.  
```
docker tag node-app:0.2 gcr.io/[project-id]/node-app:0.2
docker push gcr.io/[project-id]/node-app:0.2
```
To ***pull an image*** from gcr and run it
```
docker pull gcr.io/[project-id]/node-app:0.2
docker run -p 4000:80 -d gcr.io/[project-id]/node-app:0.2
```

### Example: Push/Pull an image to/from Amazon Elastic Container Registry
Open Amazon ECR console and create a repository. Click on "view push commands" to see the instruction.  