# Ubuntu

## chmod

read (**`r`**), write (**`w`**), and execute (**`x`**)

1. Numeric Mode

   : In numeric mode, each permission type is represented by a number: read (4), write (2), and execute (1). You add these numbers to set the desired permissions. For example:

   - **`chmod 755 file.txt`**: Gives the owner read, write, and execute permissions, and gives read and execute permissions to the group and others.

2. Symbolic Mode

   : In symbolic mode, you can use symbols to represent permission changes. The symbols are `+` to add permissions,  to remove permissions, and  `=` to set permissions explicitly. You can use the following symbols along with user categories (`u` for owner, `g` for group, `o` for others, and `a` for all):

   - **`chmod u+x file.txt`**: Adds execute permission to the owner.
   - **`chmod go-w file.txt`**: Removes write permission from the group and others.
   - **`chmod a=rw file.txt`**: Sets read and write permissions for all (owner, group, and others).

## bundle

```bash
chmod a+x VMware-Player-6.0.3-1895310.x86_64.bundle
sudo ./VMware-Player-6.0.3-1895310.x86_64.bundle
```

## deb

```bash
#install
sudo dpkg -i deb
sudo apt update
sudo apt upgrade
#uninstall
dpkg --list
sudo dpkg --remove [package-name]
```

## ImageApp

```bash
chmod u+x <AppImageFile>
./<AppImageFile>
```

## zsh/ Ohmyzsh

```bash
su root
sudo apt install zsh
#option1
sh -c "$(curl -fsSL <https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh>)"
#option2
sh -c "$(wget <https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh> -O -)"
#update
omz update
```

## nvidia-driver

```bash
sudo apt search nvidia-driver*
sudo apt install nvidia-driver-535
nvidia-smi
!fuser -v /dev/nvidia*
kill -9 PID
```

## cuda (nvcc)

```bash
sudo apt search nvidia-cuda-toolkit
```

## miniconda

```bash
sudo apt install zsh
conda init
conda init zsh
which python3
python3 -m pip install -r requirement
conda create -n name1 --clone old_name
```

## remote/ssh

```bash
sudo apt install openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh
```

## Process

```bash
ps -aux | grep vscode
killall -u hychen
```

## terminal proxy

```
sudo apt install proxychains
sudo vim /etc/proxychains.conf
socks5  127.0.0.1 7890
http  127.0.0.1 7890
socks4  127.0.0.1 7890
sudo proxychains apt update
proxychains git clone XX
vim .zshrc

unset https_proxy
unset http_proxy
unset HTTP_PROXY
unset HTTPS_PROXY
```

## Conda

```bash
conda create A --clone B
xcode-select --install
conda install -y jupyter
conda deactivate
conda env create -f XXX.yml -n u_name
conda activate u_name
python -m ipykernel install --user --name u_name --display-name "new_name"
jupyter notebook
conda clean --yes --all
```

## zip/tar

```bash
zip -r name.zip *
unzip name.zip
zipinfo -1 name.zip | xargs rm -rf
tar -zxvf archive.tar.gz
```

- **`z`**: This option tells **`tar`** to use **`gzip`** to decompress the archive. Without this option, **`tar`** will assume that the archive is not compressed.
- **`x`**: This option tells **`tar`** to extract the files from the archive. Without this option, **`tar`** will create a new archive or update an existing one.
- **`v`**: This option tells **`tar`** to be verbose and print the names of the files as they are extracted. Without this option, **`tar`** will not print anything to the console.
- **`f`**: This option tells **`tar`** to use the next argument as the name of the archive file. This is followed by the name of the archive file, which in this case would be something like **`archive.tar.gz`**.

Putting it all together, the **`tar -zxvf archive.tar.gz`** command would extract the files from the **`archive.tar.gz`** file using **`gzip`** to decompress the archive, be verbose and print the names of the files as they are extracted.

## Git

### branch

```bash
git branch --delete branch0
git branch -b branch0
```

### Use terminal to set identity and editor

1. Set identity

   `$ git config --global user.name "John Doe"  $ git config --global user.email johndoe@example.com`

   If you want to override this with a different name or email address for specific projects, you can run the command without the `--global` option when you’re in that project.

2. Set editor Now set `emacs` as the default editor:

   `$ git config --global core.editor emacs`

   If not configured, Git uses your system’s default editor.

3. Set colour Also, enable coloured output in terminals:

   `$ git config --global color.ui true`

### Connect to GitHub with SSH

1. Check keys to reuse

   `ls -alhF ~/.ssh/`

   if no files like `~/.ssh/id_rsa` and `~/.ssh/id_rsa.pub` found then

2. Generate key pair

   `$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

3. Add key to ssh-agent

   `$ eval "$(ssh-agent -s)"  $ ssh-add ~/.ssh/id_rsa`

4. Paste public key to GitHub i.e. copy the content of `~/.ssh/id_rsa.pub` into GitHub -> Personal Settings -> SSH and GPG keys -> New SSH Key

5. Test

   `$ ssh -T git@github.com`

## Tmux

- 启动 tmux：在命令行中输入 **`tmux`** 即可启动 tmux。
- 创建新会话：
  - 创建新会话并命名：在命令行中输入 **`tmux new -s session_name`** 即可创建一个新会话，并将其命名为 **`session_name`**。
  - 创建新会话并在后台运行：在命令行中输入 **`tmux new -d`** 即可创建一个新会话，并在后台运行。
- 列出所有会话：在命令行中输入 **`tmux ls`** 即可列出所有已创建的会话。
- 连接到会话：
  - 连接到已命名的会话：在命令行中输入 **`tmux attach -t session_name`** 即可连接到名为 **`session_name`** 的会话。
  - 连接到最近一次使用的会话：在命令行中输入 **`tmux attach`** 即可连接到最近一次使用的会话。

```cpp
man tmux
/bind-key #search
```

## Docker

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["<https://6igahqjn.mirror.aliyuncs.com>"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

root:

```bash
#create the docker group using groupadd command
sudo groupadd docker
#add your user to this group
sudo usermod -aG docker $USER
(base) ➜  ~ groups       
docker adm cdrom sudo dip plugdev lpadmin lxd sambashare hychen11
#if still not in groups
newgrp docker
cat /etc/issue
```

ctrl+D = exit

```bash
docker info
docker --version
docker pull ubuntu
docker image ls
sudo docker container ls
sudo docker logs container_num | less

docker stop name_or_id
docker rmi name_or_id #image
docker rm name_or_id #container
docker container run -it -v /Users/chenhaoyang/Documents/CMU15213:/CMU15213 --name=csapp ubuntu /bin/bash
#create container: -t terminal; -i interact
#-v /localPath:/targetPath mean mount the file!
docker start -i csapp
docker exec -it csapp /bin/bash
```

use vscode remote to edit code!

```shell
apt update
apt install -y sudo 
sudo apt install build-essential
```

## Self Start

### Option 1

```
vim test.sh
#!/bin/bash
### BEGIN INIT INFO
# Provides:     test
# Required-Start:  $remote_fs $syslog
# Required-Stop:   $remote_fs $syslog
# Default-Start:   2 3 4 5
# Default-Stop:   0 1 6
# Short-Description: start test
# Description:    start test
### END INIT INFO

#此处编写脚本内容
cd /home/Desktop/
./test.sh
exit 0
sudo mv test.sh /etc/init.d/
chmod +750 test.sh
sudo update-rc.d test.sh defaults
```

### Option 2

```bash
sudo nano /etc/rc.local

#!/bin/bash
# ... other content ...
/home/hychen11/Desktop/startup/1.sh
exit 0

sudo chmod +x /etc/rc.local
```

## Amazon Server / Azure Server

```bash
#ssh login
chmod 400 aws.pem
ssh -i "aws.pem" ubuntu@ec2-18-140-63-111.ap-southeast-1.compute.amazonaws.com
#set a new password for passwd login
sudo passwd root
su root
sudo vim /etc/ssh/sshd_config

PermitRootLogin yes
PasswordAuthentication yes

sudo reboot
sudo systemctl restart sshd.service

ssh root@ec2-18-140-63-111.ap-southeast-1.compute.amazonaws.com

#add new user
sudo useradd -m -s /bin/bash hychen11
sudo passwd hychen11
#remove new user
userdel -r hychen11
#add home dir
useradd -d /home/homeDir hychen11
#root user
su
#change user
su hychen11
```

### Remote

scp -P port source_path server:target_path

```python
(base) ➜  ~ ssh-keygen -t rsa

(base) ➜  ~ ssh-copy-id -p9001 hychen@10.13.74.183
#ssh-copy-id specific rsa to server
ssh-copy-id -i ~/.ssh/id_rsa1.pub root@aws.zjuchy.top
```

vscode

```python
Host 10.13.74.183
  HostName 10.13.74.183
  Port 66
  User hychen
  IdentityFile "/Users/chenhaoyang/.ssh/id_rsa"
```

## Frp (Fast Reverse Proxy)

**(Attention!!) Remember to open port on Server Console! Open remote_port, dashboard_port, bind_port!ufw cannot work only**

```bash
#open firewall
sudo ufw enable
#close firewall
sudo ufw disable
#allow and deny port
sudo ufw allow PORT_NUMBER
sudo ufw deny PORT_NUMBER
#check rules and firewall
sudo ufw status

#other way to check the port availability(List Open Files):
sudo lsof #all users
sudo lsof -u username #certain user
sudo lsof -p PID 
sudo lsof -i
sudo lsof /path/to/directory
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4dc5a0bd-0a0a-4c7b-9521-a83a5a4ff3af/Untitled.png)

### frps.ini

```bash
[common]
bind_port = 7000 #frp listening port (server 2 client)
token = 3190102984

#dashboard setting
dashboard_port = 7500
dashboard_user = admin
dashboard_pwd = admin
enable_prometheus = true

vhost_http_port = 10080
vhost_https_port = 10443
```

**`bind_port`**: This is the port on which the frp server (**`frps`**) listens for incoming connections from clients (**`frpc`**). It's the port clients use to establish connections to the server.

**`token`**: This is a security token shared between the frp server and clients. It ensures that only clients with the correct token can connect to the server.

`dashboard` : enter `http:aws.zjuchy.top:7500` and we enter user and pwd, it shows frps.ini is correct.

### frpc.ini (My ROG)

```bash
[common]
server_addr = aws.zjuchy.top #server ip
server_port = 7000 # port to connect server
token=3190102984 # the same with frps.ini token
#ssh server configuration
[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22 #22 is ssh port
remote_port = 7001 # open port for other terminal to visit
```

**`server_addr` and `server_port`**: These settings specify the address and port of the frp server (**`frps`**) to which the client

When you initiate an SSH connection to the **`server_addr`** of the **`frp`** server on port **`7001`**, the **`frp`** server receives this connection request.

```bash
#**We connect remote_port of the server, then server transfer request to client through bind_port**
ssh -p7001 hychen11@aws.zjuchy.top
```

Start_up

```bash
#!/bin/bash

# Start frpc in a tmux session

# Set the path to the frpc configuration file
CONFIG_FILE="/home/hychen11/frp_0.51.1_linux_amd64/frpc.ini"

# Set the path to the frpc executable
FRPC_EXECUTABLE="/home/hychen11/frp_0.51.1_linux_amd64/frpc"

# Start the tmux session and frpc
tmux new-session -d -s frpc_session "$FRPC_EXECUTABLE -c $CONFIG_FILE"

# Detach from the tmux session
tmux detach-client

echo "frpc started in a tmux session. Use 'tmux attach-session -t frpc_session' to reattach."
```

## Reverse/Forward Proxy

A proxy server, sometimes referred to as a forward proxy, is a server that routes traffic between client(s) and another system, usually external to the network. By doing so, it can regulate traffic according to preset policies, convert and mask client IP addresses, enforce security protocols, and block unknown traffic.

A reverse proxy is a type of proxy server. Unlike a traditional proxy server, which is used to protect clients, a reverse proxy is used to protect servers. A reverse proxy is a server that accepts a request from a client, forwards the request to another one of many other servers, and returns the results from the server that actually processed the request to the client as if the proxy server had processed the request itself. The client only communicates directly with the reverse proxy server and it does not know that some other server actually processed its request.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8f44a8ec-659c-4512-891b-dec47318f0ea/Untitled.png)

## Systemctl and Systemd/Servive (still don’t know)

- **`systemctl start SERVICE_NAME`**: Start a service.
- **`systemctl stop SERVICE_NAME`**: Stop a service.
- **`systemctl restart SERVICE_NAME`**: Restart a service.
- **`systemctl enable SERVICE_NAME`**: Enable a service to start on boot.
- **`systemctl disable SERVICE_NAME`**: Disable a service from starting on boot.
- **`systemctl status SERVICE_NAME`**: Display the status of a service.
- **`systemctl daemon-reload`**: Reload **`systemd`** after modifying unit files.

## ROG RGB

```bash
rogauracore initialize_keyboard
rogauracore brightness 3
rogauracore rainbow_cycle 1
```

## Hardware

```bash
$ lscpu|less

Architecture:                    x86_64
CPU op-mode(s):                  32-bit, 64-bit
Address sizes:                   39 bits physical, 48 bits virtual
Byte Order:                      **Little Endian**
CPU(s):                          20
On-line CPU(s) list:             0-19
Vendor ID:                       GenuineIntel
Model name:                      13th Gen Intel(R) Core(TM) i7-13650HX
CPU family:                      6
Model:                           183
Thread(s) per core:              2
Core(s) per socket:              14
Socket(s):                       1
Stepping:                        1
CPU max MHz:                     4900.0000
CPU min MHz:                     800.0000
BogoMIPS:                        5606.40
Flags:                           fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc art arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf tsc_known_freq pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 sdbg fma cx16 xtpr pdcm sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm 3dnowprefetch cpuid_fault epb ssbd ibrs ibpb stibp ibrs_enhanced tpr_shadow vnmi flexpriority ept vpid ept_ad fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid rdseed adx smap clflushopt clwb intel_pt sha_ni xsaveopt xsavec xgetbv1 xsaves split_lock_detect avx_vnni dtherm ida arat pln pts hwp hwp_notify hwp_act_window hwp_epp hwp_pkg_req hfi umip pku ospke waitpkg gfni vaes vpclmulqdq rdpid movdiri movdir64b fsrm md_clear serialize arch_lbr ibt flush_l1d arch_capabilities
Virtualization:                  VT-x
L1d cache:                       544 KiB (14 instances)
L1i cache:                       704 KiB (14 instances)
L2 cache:                        11.5 MiB (8 instances)
L3 cache:                        24 MiB (1 instance)
NUMA node(s):                    1
NUMA node0 CPU(s):               0-19
Vulnerability Itlb multihit:     Not affected
Vulnerability L1tf:              Not affected
Vulnerability Mds:               Not affected
Vulnerability Meltdown:          Not affected
Vulnerability Mmio stale data:   Not affected
Vulnerability Retbleed:          Not affected
Vulnerability Spec store bypass: Mitigation; Speculative Store Bypass disabled via prctl
Vulnerability Spectre v1:        Mitigation; usercopy/swapgs barriers and __user pointer sanitization
Vulnerability Spectre v2:        Mitigation; Enhanced IBRS, IBPB conditional, RSB filling, PBRSB-eIBRS SW sequence
Vulnerability Srbds:             Not affected
Vulnerability Tsx async abort:   Not affected
~
```

## Decode PDF Password

**`zfill`** is a method in Python that is used to pad a string on the left with zeros (0) to achieve a specified width. It stands for "zero fill."

```python
original_string = "42"
padded_string = original_string.zfill(5)

print(padded_string)
#00042
import pikepdf

# Iterate through a range of passwords
for i in range(1000000):
    if i % 1000 == 0:
        print(f'Processing password attempt: {i}')
    
    password = str(i).zfill(6)
    
    try:
        # Open the PDF with the current password attempt
        with pikepdf.open('input.pdf', password=password) as pdf:
            num_pages = len(pdf.pages)
            pdf.save('output.pdf')
    
    except pikepdf.PasswordError:
        # Password is incorrect, continue to the next attempt
        continue
    
    else:
        # Password is correct, break the loop
        print(f'Password is {password}')
        break
```

## Version control (update-alternatives)

假设你的系统上安装了多个 Java 版本（比如 OpenJDK 8 和 OpenJDK 11），你可以使用 **`update-alternatives`** 来设置默认的 Java 版本。

配置默认版本:

```bash
sudo update-alternatives --config java
```

安装 Python 替代方案: 首先，你需要用 **`update-alternatives`** 注册每个 Python 版本。例如：

这里 **`/usr/bin/python`** 是通用命令，**`/usr/bin/python2.7`** 和 **`/usr/bin/python3.8`** 是具体的 Python 版本路径，**`1`** 和 **`2`** 是优先级。

```bash
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2.7 1
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.8 2
```

### c++

12 is the priority level

```bash
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-12 12
```

## sudo apt update & upgrade

```bash
sudo add-apt-repository XXXX
sudo apt update
sudo apt install XXXX

sudo apt remove XXXX
sudo apt autoremove #delete dependencies
sudo add-apt-repository --remove XXXX
sudo apt update
sudo apt upgrade 
```

## Perf & FlameGraph

```bash
sudo apt install linux-tools-common
sudo apt install linux-tools-generic linux-cloud-tools-generic
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install linux-tools-6.2.0-39-generic linux-cloud-tools-6.2.0-39-generic
(base) ➜  ~ perf --version
perf version 6.2.16
```

`--depth 1` represent fetch latest version

```bash
git clone <https://github.com/brendangregg/FlameGraph.git> --depth 1
sudo mv FlameGraph /opt/FlameGraph
vim ~/.zshrc
source ~/.zshrc
# ~/.zshrc
export PATH=$PATH:/opt/FlameGraph
```

how to use

```bash
cd build
make b_plus_tree_insert_test
perf record -g ./test/b_plus_tree_insert_test
perf script | stackcollapse-perf.pl | flamegraph.pl > out.svg
sudo perf record -F 99 -p 2512 -g -- sleep 60
```

record：表示采集系统事件，没有采用 -e 执行采集事件，则默认采集 cycles（即 CPU clock 周期） -F 99：指定采样频率为 99Hz（每秒99次），如果 99次都返回同一个函数名, 那就说明 CPU 这一秒钟都在执行同一个函数，可能存在性能问题。 -p 2512：指定进程号，对某一个进程分析 -g：表示记录调用栈 sleep 30：表示持续 30

## Link

**硬链接**直接指向文件的物理内容。创建硬链接意味着添加一个新的文件名作为现有文件内容的引用。要创建硬链接：

```bash
ln source_file link_name
```

这里 **`source_file`** 是原始文件的名称，**`link_name`** 是你要创建的硬链接的名称。

注意：

- 硬链接不能跨文件系统。
- 硬链接不能链接到目录，只能链接到文件。
- 删除原始文件不会影响硬链接，因为硬链接是对文件内容的直接引用。

**软链接**，类似于 Windows 系统中的快捷方式。它实际上是一个指向另一个文件的特殊类型的文件。

```bash
ln -s target_file link_name
```

这里 **`target_file`** 是你想要链接到的文件或目录的路径，**`link_name`** 是符号链接的名称。

注意：

- 符号链接可以链接到目录。
- 符号链接可以跨文件系统。
- 符号链接只是一个指向另一个文件的指针，如果原始文件被删除，符号链接将不起作用。
