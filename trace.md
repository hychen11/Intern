# Zipkin

* TraceId
* SpanId
* ParentId
* Span

服务内调用是存在threadlocal或者上下文context里，服务间调用是通过 HTTP Header 或 RPC 元数据传递给下一个服务

### InheritableThreadLocal 

就是子线程在创建的时候，会复制父线程的变量

但是在异步或者线程池的情况下还是会丢失traceId

### TransmittableThreadLocal (TTL)

1. 替换 `ThreadLocal` 为 `TransmittableThreadLocal`
2. 使用 TTL 提供的工具类 `TtlRunnable`, `TtlCallable`, 或包装 `ExecutorService`

- `captured` 是在父线程中调用 `TtlRunnable.get()` 时 **捕获的上下文快照**
- 子线程运行前：`restoreTtlValues()` 设置上下文
- 运行后：还原原线程变量，避免污染线程池中线程的上下文