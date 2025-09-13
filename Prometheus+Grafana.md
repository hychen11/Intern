```
docker network create monitor
```

```
docker run --name prometheus -d \
	--network monitor \
  -p 127.0.0.1:9090:9090 \
  --restart unless-stopped \
  prom/prometheus
```

```
docker run -d --network monitor -p 3000:3000 --name=grafana --restart unless-stopped grafana/grafana-enterprise
```

Connection `http://prometheus:9090`

they need to be in the same network!

Prometheus 可以定期访问 /actuator/prometheus 端点拉取指标数据，实现对 Spring Boot 应用的持续监控和告警。

总结一下作用：

- ﻿﻿Spring-boot-starter-actuator = 端点提供者（开门的）
- ﻿﻿micrometer-core = 数据收集者
- ﻿﻿micrometer-registry-prometheus = 格式转换者（翻译的）
- ﻿﻿Prometheus = 数据拉取者（消费的）