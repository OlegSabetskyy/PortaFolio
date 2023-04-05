<?
require_once("vendor/autoload.php"); // load composer files
require_once("some/file.php"); // load custom file

// php mailer imports
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


// pretty json
$json = [
    "hello" => "world"
];
echo json_encode($json, JSON_PRETTY_PRINT);
error_log(print_r($json, true));

// search for item in array
if(array_search($array, $search_term) === false){
    // not found
}

// send mail through php mailer
function send_mail(): void {
    $php_mailer = new PHPMailer();
    
    try {
        $php_mailer -> Host = "";
        $php_mailer -> Port = 587;
        $php_mailer -> CharSet = "UTF-8";

        $php_mailer -> setFrom("from@from.com", "From");
        $php_mailer -> addAddress("to@to.com", "To");
        $php_mailer -> addCC("cc@cc.com", "Cc"); 
        $php_mailer -> addBCC("bcc@bcc.com", "Bcc"); 

        $php_mailer -> Subject = "Subject";
        $php_mailer -> Body = "Body";
        $php_mailer -> IsHTML(true);

        $php_mailer -> addAttachment(
            "/path/to/file.pdf", // local path to the file
            "attachment_file_name.pdf", // attachment name
            ENCODING_BASE64, // encoding of the attachment
            "application/pdf", // file type, not necessary, if not provided then will be determined automatically from file
            "attachment" // disposition
        );

        $php_mailer -> AddStringAttachment(
            "some-base64-code", // base 64 string
            "Filename.pdf",  // attachment name
            "base64", //encoding
            "application/pdf" // file type
        );

        $php_mailer -> send();
    } catch (Exception $e) {
        error_log("failed sending an email, php_mailer error: {$php_mailer->ErrorInfo}");
    }
}

function send_mail_smtp(): void {
    $php_mailer = new PHPMailer();

    try {
        // $php_mailer -> SMTPDebug = SMTP::DEBUG_SERVER; // debug
        $php_mailer -> isSMTP();
        $php_mailer -> Host = "smtp.demo.com";
        $php_mailer -> Port = 587;
        $php_mailer -> CharSet = "UTF-8";
        $php_mailer -> SMTPSecure = "ssl";
        $php_mailer -> SMTPAuth   = true;
        $php_mailer -> Username   = "from@from.com";
        $php_mailer -> Password   = "from-password";
        $php_mailer -> SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        
        $php_mailer -> setFrom("from@from.com", "From");
        $php_mailer -> addAddress("to@to.com", "To");

        $php_mailer -> SMTPOptions = array(
            "ssl" => array(
                "verify_peer" => false,
                "verify_peer_name" => false,
                "allow_self_signed" => true
            )
        );
        // add custom .cer file
        // $php_mailer -> SMTPOptions = [
        //     "ssl" => [
        //         "cafile" => "/path/to/cert.cer.der"
        //     ]
        // ];

        $php_mailer -> Subject = "Test";
        $php_mailer -> Body = "body";
        $php_mailer -> isHTML(true);

        $php_mailer -> send();
    } catch (Exception $e) {
        error_log("mail could not be sent, php_mailer error: {$php_mailer->ErrorInfo}");
    }
}

?>