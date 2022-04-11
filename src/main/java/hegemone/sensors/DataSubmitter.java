package hegemone.sensors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;

public class DataSubmitter {
    private static final Logger logger = LoggerFactory.getLogger("hegemone.sensors.datasubmitter");
    static List<DataConsumer> consumerList = new ArrayList<>();
    /**
     * Submit data to some kind of data consumer
     */
    public static void submit(String data) {
        logger.debug("---- submitting data -----\n" + data + "\n----- end data submission frame ------");
        consumerList.forEach(c -> c.accept(data));
    }

    public static void register(DataConsumer consumer) {
        consumerList.add(consumer);
    }
}
