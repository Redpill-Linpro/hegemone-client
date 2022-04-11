package hegemone.sensors;

import com.github.wnameless.json.flattener.JsonFlattener;
import com.google.gson.Gson;
import io.questdb.cutlass.line.AbstractLineSender;
import io.questdb.cutlass.line.LineTcpSender;
import io.questdb.cutlass.line.LineUdpSender;
import io.questdb.network.Net;
import io.questdb.std.Os;

import java.util.Map;

public class QuestDBConsumer implements DataConsumer {

    private String tableName = "hegemone_sensors";
    private String IPv4Address;
    private int port;

    public QuestDBConsumer(String IPv4Address, int port) {
        this.IPv4Address = IPv4Address;
        this.port = port;
    }

    @Override
    public void accept(String data) {
        var gs = new Gson();
        var flattenedData = new JsonFlattener(data).withSeparator('/').flatten();
        var cleaned = flattenedData.replaceAll("/", "_");
        cleaned = cleaned.replaceAll("\\[(\\d)\\]", "_$1");
        Map map = (Map) gs.fromJson(cleaned, Object.class);
        var entries = map.entrySet();
        System.out.println(entries);
        try (LineTcpSender sender = new LineTcpSender(Net.parseIPv4(IPv4Address), port, 256*1024)) {
            var metric = sender.metric(tableName)
                    .tag("by", "hegemone");
            entries.forEach(e -> {
                var entry = (Map.Entry<?, ?>) e;
                var column = entry.getKey().toString();
                var value = entry.getValue();
                switch (value) {
                    case Integer i -> metric.field(column, i);
                    case Double d -> metric.field(column, d);
                    case String s -> metric.field(column, s);
                    case Long l -> metric.field(column, l);
                    case default -> metric.field(column, value.toString());
                }
            });
            System.out.println("Debug metric\n" + metric.toString());
            metric.$(Os.currentTimeMicros() * 1000);
            metric.flush();
        }
    }

        public void setTableName (String tableName){
            this.tableName = tableName;
        }
    }
