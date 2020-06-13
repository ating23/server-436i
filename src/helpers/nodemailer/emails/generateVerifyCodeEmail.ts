export default function generateVerifyCodeEmail (code: string, name: string, email: string): string {
  return `
  <div style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
    <table border="0" cellspacing="0" cellpadding="0" align="center" id="m_-4296817631334524064email_table" style="border-collapse:collapse">
      <tbody>
          <tr>
            <td id="m_-4296817631334524064email_content" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
                <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                  <tbody>
                      <tr>
                        <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                      </tr>
                      <tr>
                        <td height="1" colspan="3" style="line-height:1px"><span style="color:#ffffff;font-size:1px">&nbsp; Hi ${name}, We received a request to reset your Educonnections password. Enter the following password reset code: ${code}.</span></td>
                      </tr>
                      <tr>
                        <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                        <td>
                            <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                              <tbody>
                                  <tr>
                                    <td height="28" style="line-height:28px">&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td>
                                        <span class="m_-4296817631334524064mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">
                                          <p>Hi ${name},</p>
                                          <p></p>
                                          <div>We received a request to reset your Educonnections password.</div>
                                          Enter the following password reset code:
                                          <table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-top:9px;margin-bottom:15px">
                                              <tbody>
                                                <tr>
                                                    <td style="font-size:11px;font-family:LucidaGrande,tahoma,verdana,arial,sans-serif;padding:10px;background-color:#f2f2f2;border-left:1px solid #ccc;border-right:1px solid #ccc;border-top:1px solid #ccc;border-bottom:1px solid #ccc"><span class="m_-4296817631334524064mb_text" style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:16px;line-height:21px;color:#141823">${code}</span></td>
                                                </tr>
                                              </tbody>
                                          </table>
                                          <br>
                                        </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td height="28" style="line-height:28px">&nbsp;</td>
                                  </tr>
                              </tbody>
                            </table>
                        </td>
                        <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                      </tr>
                      <tr>
                        <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                        <td>
                            <table border="0" width="100%" cellspacing="0" cellpadding="0" align="left" style="border-collapse:collapse">
                              <tbody>
                                  <tr style="border-top:solid 1px #e5e5e5">
                                    <td height="19" style="line-height:19px">&nbsp;</td>
                                  </tr>
                                  <tr>
                                    <td style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;font-size:11px;color:#aaaaaa;line-height:16px">This message was sent to <a href="mailto:${email}" style="color:#3b5998;text-decoration:none" target="_blank">eduardo@garza.ca</a> at your request.</td>
                                  </tr>
                              </tbody>
                            </table>
                        </td>
                        <td width="15" style="display:block;width:15px">&nbsp;&nbsp;&nbsp;</td>
                      </tr>
                      <tr>
                        <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                      </tr>
                  </tbody>
                </table>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
  `
}