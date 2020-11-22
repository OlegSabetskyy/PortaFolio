import java.io.IOException;

import org.apache.pdfbox.util.PDFTextStripper;
import org.apache.pdfbox.util.TextPosition;
import org.w3c.dom.ls.LSOutput;

public class FontSizeDetector extends PDFTextStripper{

	public static String textProva = "";
	
    public FontSizeDetector() throws IOException{
    	//System.out.println("LOCO");
    }
    
    @Override
    protected void processTextPosition( TextPosition text ) {
    	try {
    		String a = text.getCharacter();
    		char b = a.toCharArray()[0];
    		System.out.println((int)b + " = " + a );
    		/*if((int) b == 32) {
    			this.textProva = this.textProva.concat("\n");
    		}else {
    			this.textProva = this.textProva.concat(text.toString());
    		}*/
    		
    		//super.processTextPosition(text);
    		//this.textProva = this.textProva.concat(text.);
    		//System.out.println(text.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	//System.out.println("Loco");
    }
    
    
    //PROVAR COSES LOCO
    //text.getFont().getFontDescriptor().getFontWeight()
    //text.getFont().getBaseFont().Contains("bold")
    
    public static String getTextProva() {
    	return textProva;
    }
}
