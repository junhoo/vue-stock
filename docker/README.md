++34:42++
- 安装
```
yum install -y docker-io
```

### Ali加速

[管理中心](https://cr.console.aliyun.com/cn-shenzhen/new)
`**10002009-**`

>centos
```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://5yr03gfb.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

加速器地址 1 |
-------------|
https://5yr03gfb.mirror.aliyuncs.com |

### Image
- Docker 把应用程序及其依赖，打包在image文件里面。通过这个文件，才生成容器
- image 文件可以看做是容器的模板
- Docker 根据 image 文件生成容器的实例
- 同一个 image 文件，可以生成多个同时运行的容器实例
- 一个 image 文件往往通过集成另一个 image 文件，加上一些个性化设置而生成

命令   | 含义    | 解释
-------|---------|---------
images | 查看全部镜像 | docker image ls
pull   | 拉去镜像     | docker pull [imageName]
rmi    | 删除镜像     | docker rmi [imageName]

**查找镜像**
```
docker search ubuntu
// 查看配置
cat daemon.json
```
字段       | 含义    
-----------|---------
NAME       | 名称
DESCRIPTION| 描述
STARTS     | 星星的数量
OFFICIAL   | 是否官方源

**查看镜像**
```
docker images ls
```
字段       | 含义    
-----------|---------
REPOSITORY | 仓库地址
TAG        | 标签
IMAGE_ID   | 镜像ID
OFFICIAL   | 是否官方源

**拉取镜像**
```
docker pull ubuntu
```
- library/hello-world是 image 文件在仓库里面的位置，library是image的作者，hello-world是 image文件名
- docker 官方提供的 image 文件，都放在library组里面，

### 容器
- `docker run`从`image`文件，生成一个正在运行的容器实例
- docker container run 命令具有自动抓取image文件的功能。如果发现本地没有指定的image文件，就会从仓库自动抓取
- 输出提示以后，是不会提示
- 有些容器不会自动终止
- image 文件生成的容器实例，本身也是一个文件，称为容器文件
- 容器生成，就会同事存在两个文件：image 文件和容器文件
- 关闭容器并不会删除容器文件，只是容器停止运行

**命令**
字段              | 含义                 | 案例
------------------|----------------------|------
run               | 从镜像运行一个容器   | docker image ls
ps                | 查看当前运行的容器   | docker ps -a -l
kill[containerid] | 终止容器(发送SIGKILL)| docker kill[containerid]
rm[containerid]   | 删除容器             | docker rm[containerid]
start[containerid]| 启动已经生成、已经停止运行的容器文件 | docker start[containerid]
stop[containerid] | 终止容器运行(发送SIGTERM) | docker stop[containerid]
logs[containerid] | 查看docker容器的输出      | docker logs[containerid]
exec[containerid] | 进入一个正在运行的docker容器      | docker exec[containerid]
cp[containerid]   | 从正在运行的docker容器里面把文件拷贝到本机      | docker cp[containerid]

```
docker run -d -p 8000:80 nginx
```
**启动**
```
docker run ubuntu /bin/echo "Hello world"
docker run -it ubuntu bash
```

### 编辑
```
docker commit -m 'hello' -a 'text-name' [containerId] junhao/hello:latest
docker images
docker run junhao/hello:latest /bin/bash
docker rm b123456
docker rmi c123456
```