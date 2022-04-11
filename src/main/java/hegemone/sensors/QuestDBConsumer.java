package hegemone.sensors;

import com.github.wnameless.json.flattener.JsonFlattener;
import com.google.gson.Gson;
import io.questdb.cutlass.line.LineUdpSender;
import io.questdb.network.Net;

import java.util.Map;

public class QuestDBConsumer implements DataConsumer {
    private LineUdpSender sender;
    private String IPv4Address;
    private String tableName = "hegemone_sensors";
    public QuestDBConsumer(String IPv4Address, int port) {
        this.IPv4Address = IPv4Address;
        sender = new LineUdpSender(0,
                Net.parseIPv4(IPv4Address),
                port, 110, 2);
    }
    @Override
    public void accept(String data) {
        var gs = new Gson();
        var flattenedData = JsonFlattener.flatten(data);
        Map map = (Map) gs.fromJson(flattenedData, Object.class);
        var entries = map.entrySet();
        System.out.println(entries);
//        var metric =   sender.metric(tableName)
//                .tag("by", "hegemone");
//        for(Map.Entry entry : entries) {
//            var column = entry.getKey().toString();
//            var entry = entry.getValue();
//            switch(entry) {
//                case Integer i -> metric.field(column, i);
//                case Double d -> metric.field(column, d);
//                case String s -> metric.field(column, s);
//                case Long l -> metric.field(column, l);
//                case default -> metric.field(column, entry.toString());
//            }
//            metric.flush();
//        }
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
}
