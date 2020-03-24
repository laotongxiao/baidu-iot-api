public class App {
    public static void main( String[] args )
    {
        String ACCESS_KEY_ID = "c02376d42a05434c98******************";			// 用户的Access Key ID
        String SECRET_ACCESS_KEY = "08ead63a52f84ad****************";	// 用户的Secret Access Key
        Auth auth = new Auth(ACCESS_KEY_ID, SECRET_ACCESS_KEY);
        auth.device01();
        //System.out.println("test--------");
    }
}
