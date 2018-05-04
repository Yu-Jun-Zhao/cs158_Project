import javax.swing.JFrame;
import javax.swing.JOptionPane;
import java.io.*;
import java.net.Socket;
import java.net.UnknownHostException;

//Client for P2P server
public class Client {
	 
	
	
	public void displayUI()
	{
		
	}
	
	public void connectToServer() throws IOException
	{
		//Requires the IP address that the server is running on
			String serverAddress = JOptionPane.showInputDialog(
			"Enter the IP Address of the machine that is\n "
				+ "running the P2P service on port 1535");
		// Make connection and initialize streams 
			Socket s = new Socket (serverAddress, 1535);
			BufferedReader in = new BufferedReader(
					new InputStreamReader(s.getInputStream())); //IN Stream
			PrintWriter out = new PrintWriter(s.getOutputStream(),true); //OUT stream

	}
 
	public static void main(String[] args) throws UnknownHostException, IOException
	{
		
		JFrame frame = new JFrame("PeerToPeer");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setVisible(true);
		
	}
}
