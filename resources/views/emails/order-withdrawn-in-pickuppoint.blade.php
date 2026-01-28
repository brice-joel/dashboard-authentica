<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Confirmation de commande - Authentica</title>
</head>

<body
    style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f4f4;">

    <div
        style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eeeeee;">
            <h1 style="color: #4CAF50; font-size: 24px; margin: 0;">✅ Retrait de votre commande !!!</h1>
        </div>

        <div style="padding: 20px 0;">
            <h2 style="font-size: 18px; color: #333333;">Bonjour Mr {{ $order->client_name }},</h2>

            <p style="margin-bottom: 25px;">Merci beaucoup d'avoir choisi **Authentica** ! Votre commande a été
                retiré avec succès et est désormais entre vos main.</p>

            <table role="presentation" cellspacing="0" cellpadding="0"
                style="width: 100%; margin-bottom: 30px; border-collapse: collapse;">
                <tr>
                    <td
                        style="padding: 12px; background-color: #e9f7ef; border: 1px solid #d4edda; border-radius: 4px;">
                        <p style="font-size: 15px; margin: 0; padding: 0;">
                            <strong>Numéro de commande :</strong> <span
                                style="float: right; color: #007bff; font-size: 16px;">{{ $order->order_ref }}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td
                        style="padding: 12px; border-top: none; border: 1px solid #d4edda; background-color: #d4edda; border-radius: 4px;">
                        <p style="font-size: 15px; margin: 0; padding: 0;">
                            <strong>Montant total :</strong> <span
                                style="float: right; color: #333333; font-size: 18px; font-weight: bold;">{{ number_format($order->order_amount, 0, ',', ' ') }}
                                FCFA</span>
                        </p>
                    </td>
                </tr>
            </table>

            <p style="margin-top: 20px;">
                Nous vous remercions pour votre confiance.
            </p>

        </div>

        <div
            style="text-align: center; padding: 20px; margin-top: 20px; border-top: 2px dashed #cccccc; background-color: #f9f9f9; border-radius: 4px;">
            <p style="font-size: 16px; font-style: italic; color: #555555; margin: 0;">
                **Votre satisfaction est notre priorité.**
            </p>
            <p style="font-size: 16px; font-style: italic; color: #555555; margin: 5px 0 0;">
                N'hésitez pas à nous contacter ; **nous sommes toujours là pour vous servir et répondre à vos
                questions.**
            </p>
        </div>

        <div
            style="text-align: center; padding-top: 20px; border-top: 1px solid #eeeeee; font-size: 12px; color: #999999;">
            <p style="margin: 5px 0;">Cordialement,</p>
            <p style="font-weight: bold; margin: 5px 0;">L'équipe Authentica</p>
            <p style="margin-top: 15px;"><a href="https://www.authentica.cm"
                    style="color: #007bff; text-decoration: none;">Visitez notre site web</a></p>
        </div>

    </div>
</body>

</html>
