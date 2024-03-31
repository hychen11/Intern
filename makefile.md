# Makefile & GDB

> DRW Codility 2023.9.22

Your task is to create a Makefile which is able to build an executable based on multiple source files. The details are listed below:

- The code of your project consists of cpp files only. All of them are in the ./src directory.
- Set up the proper compilation and linking flags globally: Your team has decided to use the root-config utility, which is used to configure and determine compiler and linker flags. So all you need to do is to use the flags that are listed there:
  - root-config --cflags for the CPPFLAGS;
  - root-config --Idflags for the LDFLAGS;
  - Build the executables with an extra flag ( -g ) for debugging info.
- Create the following build scenario:
  - Use only .cpp files that end with codility.cpp and ignore the rest;
  - For each codility.cpp file, create a codility.cpp.o file, and in the build command, use the CPPFLAGS that you defined before;
  - Build the final executable called program using all of the cpp.o files together; don't forget to use the LDFLAGS that you defined before.
- Everything created by this Makefile should be placed in the . /build directory.
  - Specifically: ﻿./build/program ﻿. /build/src/*codility.cpp.o
- Create a clean target which removes the . /build directory and all of its contents.

Here is a summary of how the Makefile should work: ﻿make should create a . /build directory,.

/build/program executable and related cpp.o files, according to the scenario above; ﻿No other build targets are necessary, but creating and referencing them will probably make it easier to finish the task.

```cpp
#compiler
CXX = g++

#FLAGS
CXXFLAGS=Wall -g -c -std=c++11
CPPFLAGS = $(shell root-config --cflags)
LDFLAGS = $(shell root-config --ldflags)
DEBUG_FLAG = -g

#source file
SOURCES= $(wildcard src/*codility.cpp)

OBJDIR = build/src

OBJECTS=$(patsubst src/%.cpp,$(OBJDIR)/%.cpp.o ,$(SOURCES))

EXECUTABLE=build/program

#build
all:$(OBJDIR) $(OBJECTS) $(EXECUTABLE)

$(EXECUTABLE):$(OBJECTS)
    $(CXX) $(LDFLAGS) $(OBJECTS) -o $@

$(OBJDIR)/%.cpp.o: src/%.cpp
    @mkdir -p $(@D)
    $(CXX) $(CPPFLAGS) $(DEBUG_FLAG) -c $< -o $@

$(OBJDIR):
    @mkdir -p $(OBJDIR)

clean:
    rm -rf build
```

**`@mkdir -p $(@D)`**: This line creates the directory structure necessary to place the object files. **`@mkdir -p`** is used to create the directories specified in the target path. **`$(@D)`** is an automatic variable that represents the directory part of the target file (in this case, **`$(OBJDIR)/file.cpp.o`**). It ensures that the directory structure exists before attempting to create the object file.

## 通配符%, $, $@, $<, $^, $*

```makefile
%.o: %.c
    gcc -c $< -o $@
```

`%.o` 匹配所有以 `.o` 结尾的目标文件，`%.c` 匹配相应的源文件。

- **`$<`**：表示规则中的第一个依赖文件（也就是源文件）。
- **`$^`**：表示规则中的所有依赖文件的列表。
- **`$@`**：表示规则中的目标文件的名称，包括文件扩展名
- **`$\*`**：表示规则中的目标文件的基本名称，不包括文件扩展名

```makefile
_%: %.o $(ULIB)
    $(LD) $(LDFLAGS) -T $U/user.ld -o $@ $^
    $(OBJDUMP) -S $@ > $*.asm
    $(OBJDUMP) -t $@ | sed '1,/SYMBOL TABLE/d; s/ .* / /; /^$$/d' > $*.sym
```

### .PHONY

```cpp
.PHONY: clean
clean:
	rm -rf *.cpp a
```

**`.PHONY`** declaration tells Make that the **`clean`** target is a phony target, and it does not represent an actual file. When you run **`make clean`**, Make will always execute the **`rm -f \*.o`** command, even if there are no **`.o`** files in the directory.

Using **`.PHONY`** is a common practice for targets like **`clean`**, **`all`**, and other utility targets in Makefiles to ensure that the associated actions are performed reliably without relying on the existence of files with the same names.

## **6.S081的Makefile**

```
make qemu
qemu: $K/kernel fs.img
    $(QEMU) $(QEMUOPTS)

QEMU = qemu-system-riscv64

QEMUOPTS = -machine virt -bios none -kernel $K/kernel -m 128M -smp $(CPUS) -nographic
QEMUOPTS += -global virtio-mmio.force-legacy=false
QEMUOPTS += -drive file=fs.img,if=none,format=raw,id=x0
QEMUOPTS += -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0

ifeq ($(LAB),net)
QEMUOPTS += -netdev user,id=net0,hostfwd=udp::$(FWDPORT)-:2000 -object filter-dump,id=net0,netdev=net0,file=packets.pcap
QEMUOPTS += -device e1000,netdev=net0,bus=pcie.0
endif
```

qemu依赖于K/kernel 和fs.img，$K是Makefile中的变量，说明是位于kernel文件夹下的kernel文件，kernel是操作系统内核，负责生成内核的可执行文件，fs.img负责生成文件系统的镜像，相当与模拟存放用户程序的硬盘 $(QEMU) $(QEMUOPTS)是两个变量，QEMU是模拟riscv的cpu

```makefile
$K/kernel: $(OBJS) $(OBJS_KCSAN) $K/kernel.ld $U/initcode
    $(LD) $(LDFLAGS) -T $K/kernel.ld -o $K/kernel $(OBJS) $(OBJS_KCSAN)
    $(OBJDUMP) -S $K/kernel > $K/kernel.asm
    $(OBJDUMP) -t $K/kernel | sed '1,/SYMBOL TABLE/d; s/ .* / /; /^$$/d' > $K/kernel.sym

$(OBJS): EXTRAFLAG := $(KCSANFLAG)
```

这里`$K/kernel.ld`把那一堆 OBJS和OBJS_KCSAN 链接成可执行的kernel，还依赖于user下的第一个程序，`$U/initcode`

### **链接器脚本: `$K/kernel.ld`**

随后我们查看`$K/kernel.ld` ，也就是位于kernel文件夹下的kernel.ld文件

```makefile
OUTPUT_ARCH( "riscv" )
ENTRY( _entry )

SECTIONS
{
  /*
   * ensure that entry.S / _entry is at 0x80000000,
   * where qemu's -kernel jumps.
   */
  . = 0x80000000;  //把入口地址设为_entry 0x80000000

  .text : {
    *(.text .text.*) //把可执行文件中的.o文件中的text
    . = ALIGN(0x1000);//做一个yield align对齐
    _trampoline = .; //记录当前位置
    *(trampsec)      //trampsec中断相关的代码，不超过一个页表大小
    . = ALIGN(0x1000);
    ASSERT(. - _trampoline == 0x1000, "error: trampoline larger than one page");              //不能超过0x1000,不超过一个页的大小
    PROVIDE(etext = .);//
  }

  .rodata : {
    . = ALIGN(16);
    *(.srodata .srodata.*) /* do not need to distinguish this from .rodata */
    . = ALIGN(16);
    *(.rodata .rodata.*)
  }

  .data : {
    . = ALIGN(16);
    *(.sdata .sdata.*) /* do not need to distinguish this from .data */
    . = ALIGN(16);
    *(.data .data.*)
  }

  .bss : {
    . = ALIGN(16);
    *(.sbss .sbss.*) /* do not need to distinguish this from .bss */
    . = ALIGN(16);
    *(.bss .bss.*)
  }

  PROVIDE(end = .);
}
```

text放程序，rodata放只读数据，data可读可写数据，bss全局变量，初始化为0的，整体如下如图所示

### **用户空间初始化程序: `$U/initcode`**

首先initcode的依赖关系，从makefile中可以看出

```makefile
$U/initcode: $U/initcode.S
    $(CC) $(CFLAGS) -march=rv64g -nostdinc -I. -Ikernel -c $U/initcode.S -o $U/initcode.o
    $(LD) $(LDFLAGS) -N -e start -Ttext 0 -o $U/initcode.out $U/initcode.o
    $(OBJCOPY) -S -O binary $U/initcode.out $U/initcode
    $(OBJDUMP) -S $U/initcode.o > $U/initcode.asm
$U/initcode:`依赖于`$U/initcode.S
# Initial process that execs /init.
# This code runs in user space.

#include "syscall.h"

# exec(init, argv)
.globl start
start:
        la a0, init
        la a1, argv
        li a7, SYS_exec
        ecall

# for(;;) exit();
exit:
        li a7, SYS_exit
        ecall
        jal exit

# char init[] = "/init\\0";
init:
  .string "/init\\0"

# char *argv[] = { init, 0 };
.p2align 2
argv:
  .long init
  .long 0
```

### **Kernel编译流程**

1. 编译`./Kernel`目录下的`.c`和`.s`源代码，编译的到`.o`目标文件
2. 按照`kernel.ld`脚本内的指令将这堆`.o`文件链接起来，的到最终的可执行文件`kernel`
3. 按照`kernel.ld`脚本，可执行文件入口被指定为`_entry`，该符号定义在`./kernel/entry.s`文件中

## **文件系统镜像`fs.img`的生成**

```makefile
UPROGS=\\
    $U/_cat\\
    $U/_echo\\
    $U/_forktest\\
    $U/_grep\\
    $U/_init\\
    $U/_kill\\
    $U/_ln\\
    $U/_ls\\
    $U/_mkdir\\
    $U/_rm\\
    $U/_sh\\
    $U/_stressfs\\
    $U/_usertests\\
    $U/_grind\\
    $U/_wc\\
    $U/_zombie\\

fs.img: mkfs/mkfs README $(UEXTRA) $(UPROGS)
    mkfs/mkfs fs.img README $(UEXTRA) $(UPROGS)
```

### **用户程序的编译**

对于`UPROGS`变量，其中每个用户程序都以`_`开始，对应的Makefile描述如下:

这里的`_%`是通配符，%匹配任何长度的任何字符串，通常，`%` 用于定义规则的模式目标和依赖关系。例如，你可以使用 `%.o` 来匹配所有以 `.o` 结尾的目标文件。

- `` 通配符通常在命令行中或 shell 中使用，用于匹配文件名中的字符，表示零个或多个任意字符。
- 例如，你可以使用 `.c` 来匹配所有以 `.c` 结尾的文件名。
- `` 在 Makefile 规则中不会像 `%` 那样用作通配符。

```makefile
UPROGS=\\
    $U/_cat\\
    $U/_echo\\
    $U/_forktest\\
    $U/_grep\\
    $U/_init\\
    $U/_kill\\
    $U/_ln\\
    $U/_ls\\
    $U/_mkdir\\
    $U/_rm\\
    $U/_sh\\
    $U/_stressfs\\
    $U/_usertests\\
    $U/_grind\\
    $U/_wc\\
    $U/_zombie\\

ULIB = $U/ulib.o $U/usys.o $U/printf.o $U/umalloc.o

_%: %.o $(ULIB)
    $(LD) $(LDFLAGS) -T $U/user.ld -o $@ $^
    $(OBJDUMP) -S $@ > $*.asm
    $(OBJDUMP) -t $@ | sed '1,/SYMBOL TABLE/d; s/ .* / /; /^$$/d' > $*.sym

$U/usys.S : $U/usys.pl
    perl $U/usys.pl > $U/usys.S

$U/usys.o : $U/usys.S
    $(CC) $(CFLAGS) -c -o $U/usys.o $U/usys.S
$U/usys.o
    $(OBJDUMP) -S $U/_forktest > $U/forktest.asm
```

### **`mkfs`程序**

```makefile
mkfs/mkfs: mkfs/mkfs.c $K/fs.h $K/param.h
    gcc $(XCFLAGS) -Werror -Wall -I. -o mkfs/mkfs mkfs/mkfs.c

fs.img: mkfs/mkfs README $(UEXTRA) $(UPROGS)
    mkfs/mkfs fs.img README $(UEXTRA) $(UPROGS)
```

`README $(UEXTRA) $(UPROGS)`都写入fs.img中

## **Xv6启动**

Xv6内核基于riscv体系结构，实验中用了qemu这个虚拟化工具，Xv6运行在qemu创建的虚拟机中，给qemu设定的选项中比较关键的是`-kernel $K/kernel`和`-drive file=fs.img`，分别指定了要运行的内核可执行文件和文件系统的镜像

```makefile
QEMU = qemu-system-riscv64

QEMUOPTS = -machine virt -bios none -kernel $K/kernel -m 128M -smp $(CPUS) -nographic
QEMUOPTS += -global virtio-mmio.force-legacy=false
QEMUOPTS += -drive file=fs.img,if=none,format=raw,id=x0
QEMUOPTS += -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0

qemu: $K/kernel fs.img
    $(QEMU) $(QEMUOPTS)
```

### **Qemu Makefile**

```makefile
# To compile and run with a lab solution, set the lab name in conf/lab.mk
# (e.g., LAB=util).  Run make grade to test solution with the lab's
# grade script (e.g., grade-lab-util).

-include conf/lab.mk

K=kernel
U=user

OBJS = \\
  $K/entry.o \\
  $K/kalloc.o \\
  $K/string.o \\
  $K/main.o \\
  $K/vm.o \\
  $K/proc.o \\
  $K/swtch.o \\
  $K/trampoline.o \\
  $K/trap.o \\
  $K/syscall.o \\
  $K/sysproc.o \\
  $K/bio.o \\
  $K/fs.o \\
  $K/log.o \\
  $K/sleeplock.o \\
  $K/file.o \\
  $K/pipe.o \\
  $K/exec.o \\
  $K/sysfile.o \\
  $K/kernelvec.o \\
  $K/plic.o \\
  $K/virtio_disk.o

OBJS_KCSAN = \\
  $K/start.o \\
  $K/console.o \\
  $K/printf.o \\
  $K/uart.o \\
  $K/spinlock.o

ifdef KCSAN
OBJS_KCSAN += \\
    $K/kcsan.o
endif

ifeq ($(LAB),$(filter $(LAB), lock))
OBJS += \\
    $K/stats.o\\
    $K/sprintf.o
endif

ifeq ($(LAB),net)
OBJS += \\
    $K/e1000.o \\
    $K/net.o \\
    $K/sysnet.o \\
    $K/pci.o
endif

# riscv64-unknown-elf- or riscv64-linux-gnu-
# perhaps in /opt/riscv/bin
#TOOLPREFIX =

# Try to infer the correct TOOLPREFIX if not set
ifndef TOOLPREFIX
TOOLPREFIX := $(shell if riscv64-unknown-elf-objdump -i 2>&1 | grep 'elf64-big' >/dev/null 2>&1; \\
    then echo 'riscv64-unknown-elf-'; \\
    elif riscv64-linux-gnu-objdump -i 2>&1 | grep 'elf64-big' >/dev/null 2>&1; \\
    then echo 'riscv64-linux-gnu-'; \\
    elif riscv64-unknown-linux-gnu-objdump -i 2>&1 | grep 'elf64-big' >/dev/null 2>&1; \\
    then echo 'riscv64-unknown-linux-gnu-'; \\
    else echo "***" 1>&2; \\
    echo "*** Error: Couldn't find a riscv64 version of GCC/binutils." 1>&2; \\
    echo "*** To turn off this error, run 'gmake TOOLPREFIX= ...'." 1>&2; \\
    echo "***" 1>&2; exit 1; fi)
endif

QEMU = qemu-system-riscv64

CC = $(TOOLPREFIX)gcc
AS = $(TOOLPREFIX)gas
LD = $(TOOLPREFIX)ld
OBJCOPY = $(TOOLPREFIX)objcopy
OBJDUMP = $(TOOLPREFIX)objdump

CFLAGS = -Wall -Werror -O -fno-omit-frame-pointer -ggdb -gdwarf-2

ifdef LAB
LABUPPER = $(shell echo $(LAB) | tr a-z A-Z)
XCFLAGS += -DSOL_$(LABUPPER) -DLAB_$(LABUPPER)
endif

CFLAGS += $(XCFLAGS)
CFLAGS += -MD
CFLAGS += -mcmodel=medany
CFLAGS += -ffreestanding -fno-common -nostdlib -mno-relax
CFLAGS += -I.
CFLAGS += $(shell $(CC) -fno-stack-protector -E -x c /dev/null >/dev/null 2>&1 && echo -fno-stack-protector)

ifeq ($(LAB),net)
CFLAGS += -DNET_TESTS_PORT=$(SERVERPORT)
endif

ifdef KCSAN
CFLAGS += -DKCSAN
KCSANFLAG = -fsanitize=thread
endif

# Disable PIE when possible (for Ubuntu 16.10 toolchain)
ifneq ($(shell $(CC) -dumpspecs 2>/dev/null | grep -e '[^f]no-pie'),)
CFLAGS += -fno-pie -no-pie
endif
ifneq ($(shell $(CC) -dumpspecs 2>/dev/null | grep -e '[^f]nopie'),)
CFLAGS += -fno-pie -nopie
endif

LDFLAGS = -z max-page-size=4096

$K/kernel: $(OBJS) $(OBJS_KCSAN) $K/kernel.ld $U/initcode
    $(LD) $(LDFLAGS) -T $K/kernel.ld -o $K/kernel $(OBJS) $(OBJS_KCSAN)
    $(OBJDUMP) -S $K/kernel > $K/kernel.asm
    $(OBJDUMP) -t $K/kernel | sed '1,/SYMBOL TABLE/d; s/ .* / /; /^$$/d' > $K/kernel.sym

$(OBJS): EXTRAFLAG := $(KCSANFLAG)

$K/%.o: $K/%.c
    $(CC) $(CFLAGS) $(EXTRAFLAG) -c -o $@ $<

$U/initcode: $U/initcode.S
    $(CC) $(CFLAGS) -march=rv64g -nostdinc -I. -Ikernel -c $U/initcode.S -o $U/initcode.o
    $(LD) $(LDFLAGS) -N -e start -Ttext 0 -o $U/initcode.out $U/initcode.o
    $(OBJCOPY) -S -O binary $U/initcode.out $U/initcode
    $(OBJDUMP) -S $U/initcode.o > $U/initcode.asm

tags: $(OBJS) _init
    etags *.S *.c

ULIB = $U/ulib.o $U/usys.o $U/printf.o $U/umalloc.o

ifeq ($(LAB),$(filter $(LAB), lock))
ULIB += $U/statistics.o
endif

_%: %.o $(ULIB)
    $(LD) $(LDFLAGS) -T $U/user.ld -o $@ $^
    $(OBJDUMP) -S $@ > $*.asm
    $(OBJDUMP) -t $@ | sed '1,/SYMBOL TABLE/d; s/ .* / /; /^$$/d' > $*.sym

$U/usys.S : $U/usys.pl
    perl $U/usys.pl > $U/usys.S

$U/usys.o : $U/usys.S
    $(CC) $(CFLAGS) -c -o $U/usys.o $U/usys.S

$U/_forktest: $U/forktest.o $(ULIB)
    # forktest has less library code linked in - needs to be small
    # in order to be able to max out the proc table.
    $(LD) $(LDFLAGS) -N -e main -Ttext 0 -o $U/_forktest $U/forktest.o $U/ulib.o $U/usys.o
    $(OBJDUMP) -S $U/_forktest > $U/forktest.asm

mkfs/mkfs: mkfs/mkfs.c $K/fs.h $K/param.h
    gcc $(XCFLAGS) -Werror -Wall -I. -o mkfs/mkfs mkfs/mkfs.c

# Prevent deletion of intermediate files, e.g. cat.o, after first build, so
# that disk image changes after first build are persistent until clean.  More
# details:
# <http://www.gnu.org/software/make/manual/html_node/Chained-Rules.html>
.PRECIOUS: %.o

UPROGS=\\
    $U/_cat\\
    $U/_echo\\
    $U/_forktest\\
    $U/_grep\\
    $U/_init\\
    $U/_kill\\
    $U/_ln\\
    $U/_ls\\
    $U/_mkdir\\
    $U/_rm\\
    $U/_sh\\
    $U/_stressfs\\
    $U/_usertests\\
    $U/_grind\\
    $U/_wc\\
    $U/_zombie\\

ifeq ($(LAB),$(filter $(LAB), lock))
UPROGS += \\
    $U/_stats
endif

ifeq ($(LAB),traps)
UPROGS += \\
    $U/_call\\
    $U/_bttest
endif

ifeq ($(LAB),lazy)
UPROGS += \\
    $U/_lazytests
endif

ifeq ($(LAB),cow)
UPROGS += \\
    $U/_cowtest
endif

ifeq ($(LAB),thread)
UPROGS += \\
    $U/_uthread

$U/uthread_switch.o : $U/uthread_switch.S
    $(CC) $(CFLAGS) -c -o $U/uthread_switch.o $U/uthread_switch.S

$U/_uthread: $U/uthread.o $U/uthread_switch.o $(ULIB)
    $(LD) $(LDFLAGS) -N -e main -Ttext 0 -o $U/_uthread $U/uthread.o $U/uthread_switch.o $(ULIB)
    $(OBJDUMP) -S $U/_uthread > $U/uthread.asm

ph: notxv6/ph.c
    gcc -o ph -g -O2 $(XCFLAGS) notxv6/ph.c -pthread

barrier: notxv6/barrier.c
    gcc -o barrier -g -O2 $(XCFLAGS) notxv6/barrier.c -pthread
endif

ifeq ($(LAB),pgtbl)
UPROGS += \\
    $U/_pgtbltest
endif

ifeq ($(LAB),lock)
UPROGS += \\
    $U/_kalloctest\\
    $U/_bcachetest
endif

ifeq ($(LAB),fs)
UPROGS += \\
    $U/_bigfile
endif

ifeq ($(LAB),net)
UPROGS += \\
    $U/_nettests
endif

UEXTRA=
ifeq ($(LAB),util)
    UEXTRA += user/xargstest.sh
endif

fs.img: mkfs/mkfs README $(UEXTRA) $(UPROGS)
    mkfs/mkfs fs.img README $(UEXTRA) $(UPROGS)

-include kernel/*.d user/*.d

clean:
    rm -f *.tex *.dvi *.idx *.aux *.log *.ind *.ilg \\
    */*.o */*.d */*.asm */*.sym \\
    $U/initcode $U/initcode.out $K/kernel fs.img \\
    mkfs/mkfs .gdbinit \\
        $U/usys.S \\
    $(UPROGS) \\
    ph barrier

# try to generate a unique GDB port
GDBPORT = $(shell expr `id -u` % 5000 + 25000)
# QEMU's gdb stub command line changed in 0.11
QEMUGDB = $(shell if $(QEMU) -help | grep -q '^-gdb'; \\
    then echo "-gdb tcp::$(GDBPORT)"; \\
    else echo "-s -p $(GDBPORT)"; fi)
ifndef CPUS
CPUS := 3
endif
ifeq ($(LAB),fs)
CPUS := 1
endif

FWDPORT = $(shell expr `id -u` % 5000 + 25999)

QEMUOPTS = -machine virt -bios none -kernel $K/kernel -m 128M -smp $(CPUS) -nographic
QEMUOPTS += -global virtio-mmio.force-legacy=false
QEMUOPTS += -drive file=fs.img,if=none,format=raw,id=x0
QEMUOPTS += -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0

ifeq ($(LAB),net)
QEMUOPTS += -netdev user,id=net0,hostfwd=udp::$(FWDPORT)-:2000 -object filter-dump,id=net0,netdev=net0,file=packets.pcap
QEMUOPTS += -device e1000,netdev=net0,bus=pcie.0
endif

qemu: $K/kernel fs.img
    $(QEMU) $(QEMUOPTS)

.gdbinit: .gdbinit.tmpl-riscv
    sed "s/:1234/:$(GDBPORT)/" < $^ > $@

qemu-gdb: $K/kernel .gdbinit fs.img
    @echo "*** Now run 'gdb' in another window." 1>&2
    $(QEMU) $(QEMUOPTS) -S $(QEMUGDB)

ifeq ($(LAB),net)
# try to generate a unique port for the echo server
SERVERPORT = $(shell expr `id -u` % 5000 + 25099)

server:
    python3 server.py $(SERVERPORT)

ping:
    python3 ping.py $(FWDPORT)
endif

##
##  FOR testing lab grading script
##

ifneq ($(V),@)
GRADEFLAGS += -v
endif

print-gdbport:
    @echo $(GDBPORT)

grade:
    @echo $(MAKE) clean
    @$(MAKE) clean || \\
          (echo "'make clean' failed.  HINT: Do you have another running instance of xv6?" && exit 1)
    ./grade-lab-$(LAB) $(GRADEFLAGS)

##
## FOR web handin
##

WEBSUB := <https://6828.scripts.mit.edu/2022/handin.py>

handin: tarball-pref myapi.key
    @SUF=$(LAB); \\
    curl -f -F file=@lab-$$SUF-handin.tar.gz -F key=\\<myapi.key $(WEBSUB)/upload \\
        > /dev/null || { \\
        echo ; \\
        echo Submit seems to have failed.; \\
        echo Please go to $(WEBSUB)/ and upload the tarball manually.; }

handin-check:
    @if ! test -d .git; then \\
        echo No .git directory, is this a git repository?; \\
        false; \\
    fi
    @if test "$$(git symbolic-ref HEAD)" != refs/heads/$(LAB); then \\
        git branch; \\
        read -p "You are not on the $(LAB) branch.  Hand-in the current branch? [y/N] " r; \\
        test "$$r" = y; \\
    fi
    @if ! git diff-files --quiet || ! git diff-index --quiet --cached HEAD; then \\
        git status -s; \\
        echo; \\
        echo "You have uncomitted changes.  Please commit or stash them."; \\
        false; \\
    fi
    @if test -n "`git status -s`"; then \\
        git status -s; \\
        read -p "Untracked files will not be handed in.  Continue? [y/N] " r; \\
        test "$$r" = y; \\
    fi

UPSTREAM := $(shell git remote -v | grep -m 1 "xv6-labs-2022" | awk '{split($$0,a," "); print a[1]}')

tarball: handin-check
    git archive --format=tar HEAD | gzip > lab-$(LAB)-handin.tar.gz

tarball-pref: handin-check
    @SUF=$(LAB); \\
    git archive --format=tar HEAD > lab-$$SUF-handin.tar; \\
    git diff $(UPSTREAM)/$(LAB) > /tmp/lab-$$SUF-diff.patch; \\
    tar -rf lab-$$SUF-handin.tar /tmp/lab-$$SUF-diff.patch; \\
    gzip -c lab-$$SUF-handin.tar > lab-$$SUF-handin.tar.gz; \\
    rm lab-$$SUF-handin.tar; \\
    rm /tmp/lab-$$SUF-diff.patch; \\

myapi.key:
    @echo Get an API key for yourself by visiting $(WEBSUB)/
    @read -p "Please enter your API key: " k; \\
    if test `echo "$$k" |tr -d '\\n' |wc -c` = 32 ; then \\
        TF=`mktemp -t tmp.XXXXXX`; \\
        if test "x$$TF" != "x" ; then \\
            echo "$$k" |tr -d '\\n' > $$TF; \\
            mv -f $$TF $@; \\
        else \\
            echo mktemp failed; \\
            false; \\
        fi; \\
    else \\
        echo Bad API key: $$k; \\
        echo An API key should be 32 characters long.; \\
        false; \\
    fi;

.PHONY: handin tarball tarball-pref clean grade handin-check
```

# GDB

compilor process

gcc → c, g++→c++

.c → .i→ .s→ .o→ link→ executable file

预处理，编译，汇编，链接

```shell
gcc -o
gcc -c
gcc -s
objdump -S 1.o
```

