import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;


public class Auth implements InterfaceDevice {
    public String accessKeyId;
    public String secretAcessKey;
    public String host = InterfaceDevice.HOST;

    public Auth(String accessKeyId, String secretAcessKey) {
        this.accessKeyId = accessKeyId;
        this.secretAcessKey = secretAcessKey;
    }
    private String sha256Hex(String stringToSign ,String signingKey){
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(signingKey.getBytes("UTF-8"), "HmacSHA256");
            mac.init(secret_key);
            byte[] array = mac.doFinal(stringToSign.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder();
            for (byte item : array) {
                sb.append(Integer.toHexString((item & 0xFF) | 0x100).substring(1, 3));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new BceClientException("Fail to generate the signature", e);
        }
    }


    public void device01(){
        Date timestamp = new Date();
        TimeZone tz = TimeZone.getTimeZone("UTC");
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        df.setTimeZone(tz);
        String x_bce_date;
        x_bce_date = df.format(timestamp);
        //x_bce_date = "2020-03-20T13:33:41Z";
        System.out.println("-------x_bce_date------" + x_bce_date);

        String authStringPrefix;
        authStringPrefix = "bce-auth-v1" + "/" + accessKeyId + "/" + x_bce_date + "/" + "1800";
        String signingKey;
        signingKey = this.sha256Hex(authStringPrefix, secretAcessKey);
        System.out.println("-------signingKey------" + signingKey);
        String deviceUrl = InterfaceDevice.DEVICEURL01;
        String deviceName = InterfaceDevice.DEVICENAME01;
        String method = InterfaceDevice.METHOD01;
        String canonicalQueryString = InterfaceDevice.CANONICALQUERYSTRING;
        String canonicalRequest = method + "\n" + deviceUrl + deviceName + "\n" + canonicalQueryString + "\n" + "host:" + host;
        String signature =  this.sha256Hex(canonicalRequest, signingKey);
        System.out.println("-------canonicalRequest------" + canonicalRequest);
        System.out.println("-------signature------" + signature);
        String authString = authStringPrefix + "/host/" + signature;
        System.out.println("-------authString------" + authString);
        HttpClient httpClient;
        HttpGet postMethod;
        HttpResponse response;
        String reponseContent;
        try {
            httpClient = HttpClients.createDefault();
            String url = "http://" + host + deviceUrl + deviceName;
            postMethod = new HttpGet(url);
            postMethod.addHeader("Authorization", authString);
            postMethod.addHeader("Host", host);
            postMethod.addHeader("Content-type", "application/json; charset=utf-8");
            response = httpClient.execute(postMethod);
            HttpEntity httpEntity = response.getEntity();
            reponseContent = EntityUtils.toString(httpEntity);
            EntityUtils.consume(httpEntity);
            System.out.println(reponseContent);
        }catch (Exception e){
            throw new BceClientException("Fail to httpClient connet", e);
        }
    }
}


/*
 //POST请求
 public static String sendPost(String url, String sign, String timeStamp) {

        HttpClient httpClient;
        HttpPost postMethod;
        HttpResponse response;
        String reponseContent = null;
        try {
            httpClient = HttpClients.createDefault();
            postMethod = new HttpPost(url);
            //postMethod.addHeader("Content-type", "application/json; charset=utf-8");
            //设置请求头
            postMethod.addHeader("Content-type", "text/plain;charset=utf-8");
            postMethod.addHeader("accept", "*");
            postMethod.addHeader("connection", "Keep-Alive");
            postMethod.addHeader("sign", sign);
            postMethod.addHeader("timeStamp", timeStamp);
            postMethod.setEntity(new StringEntity("", Charset.forName("UTF-8")));
            response = httpClient.execute(postMethod);
            HttpEntity httpEntity = response.getEntity();
            reponseContent = EntityUtils.toString(httpEntity);
            EntityUtils.consume(httpEntity);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return reponseContent;
    }
*/
/*
GET请求
 public static String AccountCenter(String url, String Authorization) throws Exception {
        HttpClient httpClient;
        HttpGet postMethod;
        HttpResponse response;
        String reponseContent;
        httpClient = HttpClients.createDefault();
        postMethod = new HttpGet(url);
        postMethod.addHeader("Content-type", "text/plain;charset=utf-8");
        postMethod.addHeader("accept", "*");
        postMethod.addHeader("connection", "Keep-Alive");
        postMethod.addHeader("Authorization", "Bearer " + Authorization);
        response = httpClient.execute(postMethod);
        HttpEntity httpEntity = response.getEntity();
        reponseContent = EntityUtils.toString(httpEntity);
        EntityUtils.consume(httpEntity);
        return reponseContent;
    }
*/