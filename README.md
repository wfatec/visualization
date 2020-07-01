# 可视化编程实践

## 快速构建自己的静态资源服务器

### 构建 docker 镜像

切换到当前目录，执行以下命令

```
docker build -t wfatec/nginx-service:1.0 .
```

### 启动 docker 容器

```
docker run --name myservice -it -v /your/local/path/:/usr/share/nginx/html/ -p 8080:80 -d wfatec/nginx-service:1.0
```