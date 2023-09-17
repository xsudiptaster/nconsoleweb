import { Button, Modal, Typography } from "antd";
import Cookies from "js-cookie";
import React from "react";

interface ITermsAndConditionsViewProps {
   children?: React.ReactNode;
}
const { Title, Paragraph, Link, Text } = Typography;
const TermsAndConditionsView: React.FC<ITermsAndConditionsViewProps> = (props) => {
   const [open, setOpen] = React.useState(false);
   React.useEffect(() => {
      const onload = () => {
         let tnc = Cookies.get("nconsoleTC");
         if (tnc === "Yes") {
            setOpen(false);
         } else {
            setOpen(true);
         }
      };
      onload();
   }, []);
   const onClick = () => {
      Cookies.set("nconsoleTC", "Yes");
      setOpen(false);
   };
   return (
      <>
         <Modal
            width={"80vw"}
            open={open}
            title={<Title>Terms And Conditions</Title>}
            centered
            footer={
               <>
                  <Button onClick={onClick}>Accept & Confirmed</Button>
               </>
            }
         >
            <Paragraph>
               <div style={{ maxHeight: "80vh", overflow: "auto" }}>
                  These Terms and Conditions govern your use of the web application ("NConsole") provided by Sudipta Karmakar. By
                  accessing or using the App, you agree to comply with and be bound by these Terms. If you do not agree to these
                  Terms, please do not use the App.
                  <Title level={3}>1. Acceptance of Terms</Title>
                  By using the App, you agree to these Terms, our Privacy Policy, and any additional terms and conditions that may
                  apply to specific features or services within the App.
                  <Title level={3}>2. Use of Cookies and Local Storage</Title>
                  The App uses cookies and local storage to store session information necessary for your use of the App. By using
                  the App, you consent to the use of cookies and local storage in accordance with our Privacy Policy.
                  <Title level={3}>3. Salesforce Integration</Title>
                  The App includes features that integrate with Salesforce API's ("Salesforce"). By using these features, you
                  agree to comply with Salesforce's terms of service and privacy policies, as well as any additional terms and
                  conditions that may apply to Salesforce integration within the App.
                  <Title level={3}>4. Data Security</Title>
                  The Company is committed to maintaining the security and confidentiality of your session information and data.
                  We do not store any data and we do not transfer or store any data on external servers or systems.The only
                  information stored are the connection information in your local browser cookies and localStorage.
                  <Title level={3}>5. User Responsibilities</Title>
                  <ul>
                     <li>a. You agree to use the App in compliance with all applicable laws and regulations.</li>
                     <li>
                        b. You are responsible for maintaining the confidentiality of your login credentials and for all
                        activities that occur under your account.
                     </li>
                     <li>
                        c. You agree not to use the App for any unlawful, harmful, or malicious purposes, including but not
                        limited to hacking, spamming, or transmitting any harmful code.
                     </li>
                  </ul>
                  <Title level={3}>6. Modifications to the App</Title>
                  We reserve the right to modify, update, or discontinue the App at any time, with or without notice. We are not
                  liable to you or any third party for any modification, suspension, or discontinuance of the App.
                  <Title level={3}>7. Limitation of Liability</Title>
                  In no event shall the Company, its officers, directors, employees, or agents be liable for any direct, indirect,
                  incidental, special, or consequential damages arising out of or in any way connected with your use of the App,
                  whether based on contract, tort, strict liability, or other legal theory, even if we have been advised of the
                  possibility of such damages.<Title level={3}>8. Termination</Title> We reserve the right to terminate or suspend
                  your access to the App at our sole discretion, without notice, for any reason, including violation of these
                  Terms.
                  <Title level={3}>10. Contact Information</Title> If you have any questions or concerns about these Terms or the
                  App, please contact us at <Link href="https://mail:sudkarmakar@gmail.com">sudkarmakar@gmail.com</Link>. By using
                  the App, you acknowledge that you have read, understood, and agree to these Terms and Conditions. These Terms
                  and Conditions may be updated from time to time, and it is your responsibility to review them periodically.
                  <br />
                  <Text strong> Last updated:Sep 17th 2023</Text>
               </div>
            </Paragraph>
         </Modal>
      </>
   );
};

export default TermsAndConditionsView;
