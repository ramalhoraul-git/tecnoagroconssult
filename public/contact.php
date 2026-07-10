<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode([
    'ok' => false,
    'message' => 'Method not allowed.',
  ]);
  exit;
}

$autoload = __DIR__ . '/../vendor/autoload.php';

if (!file_exists($autoload)) {
  http_response_code(500);
  echo json_encode([
    'ok' => false,
    'message' => 'PHPMailer is not installed. Run Composer and provide SMTP credentials on the server.',
  ]);
  exit;
}

require $autoload;

$requiredFields = ['nome', 'telefone', 'cidade', 'email', 'area', 'mensagem'];
$data = [];

foreach ($requiredFields as $field) {
  $value = trim((string) ($_POST[$field] ?? ''));
  if ($field !== 'area' && $value === '') {
    http_response_code(422);
    echo json_encode([
      'ok' => false,
      'message' => sprintf('Field "%s" is required.', $field),
    ]);
    exit;
  }

  $data[$field] = $value;
}

$mailer = new PHPMailer(true);

try {
  $mailer->isSMTP();
  $mailer->Host = getenv('SMTP_HOST') ?: '';
  $mailer->SMTPAuth = true;
  $mailer->Username = getenv('SMTP_USERNAME') ?: '';
  $mailer->Password = getenv('SMTP_PASSWORD') ?: '';
  $mailer->SMTPSecure = getenv('SMTP_ENCRYPTION') ?: PHPMailer::ENCRYPTION_STARTTLS;
  $mailer->Port = (int) (getenv('SMTP_PORT') ?: 587);

  $fromEmail = getenv('SMTP_FROM_EMAIL') ?: 'no-reply@tecnoagro.com.br';
  $fromName = getenv('SMTP_FROM_NAME') ?: 'TECNOAGRO';
  $toEmail = getenv('SMTP_TO_EMAIL') ?: 'contato@tecnoagro.com.br';

  $mailer->CharSet = 'UTF-8';
  $mailer->setFrom($fromEmail, $fromName);
  $mailer->addAddress($toEmail, 'TECNOAGRO');
  $mailer->addReplyTo($data['email'], $data['nome']);
  $mailer->isHTML(true);
  $mailer->Subject = 'Novo pedido de diagnóstico - TECNOAGRO';

  $mailer->Body = sprintf(
    '<h2>Novo contato TECNOAGRO</h2><p><strong>Nome:</strong> %s<br><strong>Telefone:</strong> %s<br><strong>Cidade:</strong> %s<br><strong>Email:</strong> %s<br><strong>Área cultivada:</strong> %s</p><p><strong>Mensagem</strong><br>%s</p>',
    htmlspecialchars($data['nome'], ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($data['telefone'], ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($data['cidade'], ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($data['email'], ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($data['area'] ?: 'Não informado', ENT_QUOTES, 'UTF-8'),
    nl2br(htmlspecialchars($data['mensagem'], ENT_QUOTES, 'UTF-8'))
  );
  $mailer->AltBody = sprintf(
    "Novo contato TECNOAGRO\nNome: %s\nTelefone: %s\nCidade: %s\nEmail: %s\nÁrea cultivada: %s\n\nMensagem:\n%s",
    $data['nome'],
    $data['telefone'],
    $data['cidade'],
    $data['email'],
    $data['area'] ?: 'Não informado',
    $data['mensagem']
  );

  $mailer->send();

  echo json_encode([
    'ok' => true,
    'message' => 'Mensagem enviada com sucesso.',
  ]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'ok' => false,
    'message' => 'Failed to send message.',
  ]);
}