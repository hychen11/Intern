https://dunwu.github.io/bigdata-tutorial/kafka/Kafka%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8.html#_2-3-%E6%AD%A5%E9%AA%A4%E4%B8%89%E3%80%81%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-topic-%E5%B9%B6%E5%AD%98%E5%82%A8%E6%82%A8%E7%9A%84%E4%BA%8B%E4%BB%B6

```
bin/zookeeper-server-start.sh config/zookeeper.properties
```

另一个终端

```
bin/kafka-server-start.sh config/server.properties
```

创建一个topics

```
bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
```

producer

```
bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
```

consumer

```
bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
```

接入Java

```
//TODO
```

