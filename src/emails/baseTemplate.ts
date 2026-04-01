export const BASE_TEMPLATE_KEYS = [
  "EMAIL_SUBJECT",
  "HERO_IMAGE_URL",
  "HERO_ALT_TEXT",
  "TOP_TAGLINE",
  "GREETING_LINE",
  "INTRO_PARAGRAPH",
  "FEATURE_INTRO_LINE",
  "MAIN_HEADING",
  "BODY_PARAGRAPH_1",
  "BODY_PARAGRAPH_2",
  "LOGO_URL",
  "LOGO_ALT_TEXT",
  "LOGO_LINK",
  "CTA_IMAGE_URL",
  "CTA_IMAGE_ALT",
  "BULLET_1",
  "BULLET_2",
  "BULLET_3",
  "PRIMARY_CTA_URL",
  "PRIMARY_CTA_LABEL",
  "SECONDARY_HEADING",
  "SECONDARY_PARAGRAPH",
  "SIGN_OFF_LINE",
  "SIGNATURE_NAME",
  "SIGNATURE_TAGLINE",
  "FOOTER_LINE_1",
  "UNSUBSCRIBE_URL",
] as const;

export type BaseTemplateKey = (typeof BASE_TEMPLATE_KEYS)[number];
export type TemplateVariables = Partial<Record<BaseTemplateKey, string>>;

export const baseTemplateDefaults: Record<BaseTemplateKey, string> = {
  EMAIL_SUBJECT: "EMAIL_SUBJECT",
  HERO_IMAGE_URL: "https://www.difiorebuilders.com/difiore-hero-spotlight-house.webp",
  HERO_ALT_TEXT: "DiFiore Builders spotlight home",
  LOGO_URL: "https://www.difiorebuilders.com/difiore-logo.png",
  LOGO_ALT_TEXT: "DiFiore Builders logo",
  LOGO_LINK: "https://www.difiorebuilders.com",
  CTA_IMAGE_URL: "https://www.difiorebuilders.com/difiore-agent-floating.png",
  CTA_IMAGE_ALT: "Speak with the DiFiore team",
  TOP_TAGLINE: "TOP_TAGLINE",
  GREETING_LINE: "GREETING_LINE",
  INTRO_PARAGRAPH: "INTRO_PARAGRAPH",
  FEATURE_INTRO_LINE: "FEATURE_INTRO_LINE",
  MAIN_HEADING: "MAIN_HEADING",
  BODY_PARAGRAPH_1: "BODY_PARAGRAPH_1",
  BODY_PARAGRAPH_2: "BODY_PARAGRAPH_2",
  BULLET_1: "BULLET_1",
  BULLET_2: "BULLET_2",
  BULLET_3: "BULLET_3",
  PRIMARY_CTA_URL: "https://example.com",
  PRIMARY_CTA_LABEL: "PRIMARY_CTA_LABEL",
  SECONDARY_HEADING: "SECONDARY_HEADING",
  SECONDARY_PARAGRAPH: "SECONDARY_PARAGRAPH",
  SIGN_OFF_LINE: "SIGN_OFF_LINE",
  SIGNATURE_NAME: "SIGNATURE_NAME",
  SIGNATURE_TAGLINE: "SIGNATURE_TAGLINE",
  FOOTER_LINE_1: "FOOTER_LINE_1",
  UNSUBSCRIBE_URL: "https://example.com/unsubscribe",
};

export const baseEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{EMAIL_SUBJECT}}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family: Arial, sans-serif;">

  <!-- Full wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6; padding:24px 0;">
    <tr>
      <td align="center">

        <!-- Main container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 0 8px rgba(0,0,0,0.05);">
          
          <!-- Logo -->
          <tr>
            <td align="center" style="padding:18px 24px 12px 24px;">
              <a href="{{LOGO_LINK}}" style="text-decoration:none; display:inline-block;">
                <img 
                  src="{{LOGO_URL}}" 
                  alt="{{LOGO_ALT_TEXT}}" 
                  width="160" 
                  style="display:block; width:160px; max-width:100%; height:auto; border:0; line-height:0; font-size:0;">
              </a>
            </td>
          </tr>

          <!-- Hero image -->
          <tr>
            <td>
              <img 
                src="{{HERO_IMAGE_URL}}" 
                alt="{{HERO_ALT_TEXT}}" 
                width="600" 
                style="display:block; width:100%; max-width:600px; height:auto; border:0; line-height:0; font-size:0;">
            </td>
          </tr>

          <!-- Top tagline bar -->
          <tr>
            <td style="background-color:#0b3b73; color:#ffffff; padding:10px 24px; font-size:12px; text-transform:uppercase; letter-spacing:1px;">
              {{TOP_TAGLINE}}
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:24px 24px 8px 24px; color:#111827; font-size:16px; line-height:1.5;">
              <p style="margin:0 0 12px 0;">{{GREETING_LINE}}</p>

              <p style="margin:0 0 12px 0;">
                {{INTRO_PARAGRAPH}}
              </p>

              <p style="margin:0 0 16px 0;">
                {{FEATURE_INTRO_LINE}}
              </p>

              <h2 style="margin:0 0 8px 0; font-size:22px; color:#0b3b73;">
                {{MAIN_HEADING}}
              </h2>

              <p style="margin:0 0 12px 0;">
                {{BODY_PARAGRAPH_1}}
              </p>

              <p style="margin:0 0 20px 0;">
                {{BODY_PARAGRAPH_2}}
              </p>

              <!-- Bullet list (optional) -->
              <ul style="margin:0 0 20px 20px; padding:0; color:#374151; font-size:15px;">
                <li style="margin-bottom:6px;">{{BULLET_1}}</li>
                <li style="margin-bottom:6px;">{{BULLET_2}}</li>
                <li style="margin-bottom:6px;">{{BULLET_3}}</li>
              </ul>

              <!-- Primary button -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                <tr>
                  <td align="center" bgcolor="#0b3b73" style="border-radius:4px;">
                    <a href="{{PRIMARY_CTA_URL}}" 
                       style="display:inline-block; padding:12px 24px; color:#ffffff; text-decoration:none; font-weight:bold; font-size:15px;">
                      {{PRIMARY_CTA_LABEL}}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- CTA supporting image -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px 0;">
                <tr>
                  <td align="center">
                    <img 
                      src="{{CTA_IMAGE_URL}}" 
                      alt="{{CTA_IMAGE_ALT}}" 
                      width="140" 
                      style="display:block; width:140px; max-width:100%; height:auto; border:0; line-height:0; font-size:0;">
                  </td>
                </tr>
              </table>

              <!-- Secondary heading / section (optional) -->
              <h3 style="margin:0 0 8px 0; font-size:18px; color:#0b3b73;">
                {{SECONDARY_HEADING}}
              </h3>

              <p style="margin:0 0 12px 0;">
                {{SECONDARY_PARAGRAPH}}
              </p>

              <p style="margin:0 0 0 0;">
                {{SIGN_OFF_LINE}}<br>
                <strong>{{SIGNATURE_NAME}}</strong><br>
                {{SIGNATURE_TAGLINE}}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 24px;">
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 24px 20px 24px; font-size:12px; color:#6b7280;">
              <p style="margin:0 0 6px 0;">
                {{FOOTER_LINE_1}}
              </p>
              <p style="margin:0 0 6px 0;">
                If you'd rather not receive updates, you can
                <a href="{{UNSUBSCRIBE_URL}}" style="color:#0b3b73; text-decoration:underline;">unsubscribe here</a>.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Main container -->

      </td>
    </tr>
  </table>
  <!-- /Full wrapper -->

</body>
</html>
`;

export function renderTemplate(template: string, variables: TemplateVariables = {}): string {
  const merged = { ...baseTemplateDefaults, ...variables };

  return template.replace(/{{\s*([A-Z0-9_]+)\s*}}/g, (_match, key) => {
    if (key in merged) {
      return merged[key as BaseTemplateKey] ?? "";
    }
    return "";
  });
}
