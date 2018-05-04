import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
	
	public static void main(String[] args) throws IOException
	{
		ServerSocket server = new ServerSocket(1535);
		try
		{
			while(true)
			{
				Socket s = server.accept();
				try
				{
					System.out.println("Client Connected.");
				}
				finally
				{
					s.close();
				}
			} 
		}
		finally 
		{
			server.close();
		}
	}

}
