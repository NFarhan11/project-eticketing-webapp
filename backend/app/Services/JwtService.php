<?php

namespace App\Services;

class JwtService
{
    private string $secret;
    private string $algorithm = 'sha256';
    private int $expiresIn = 3600; // 1 hour

    public function __construct()
    {
        $this->secret = config('app.jwt_secret');
    }

    /**
     * Generate JWT token for user
     */
    public function generateToken(array $payload): string
    {
        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];

        $payload['iat'] = time();
        $payload['exp'] = time() + $this->expiresIn;

        $base64Header = $this->base64UrlEncode(json_encode($header));
        $base64Payload = $this->base64UrlEncode(json_encode($payload));

        $signature = hash_hmac(
            $this->algorithm,
            $base64Header . '.' . $base64Payload,
            $this->secret,
            true
        );

        $base64Signature = $this->base64UrlEncode($signature);

        return $base64Header . '.' . $base64Payload . '.' . $base64Signature;
    }

    /**
     * Validate and decode JWT token
     */
    public function validateToken(string $token): ?array
    {
        $parts = explode('.', $token);

        if (count($parts) !== 3) {
            return null;
        }

        [$base64Header, $base64Payload, $base64Signature] = $parts;

        // Verify signature
        $signature = hash_hmac(
            $this->algorithm,
            $base64Header . '.' . $base64Payload,
            $this->secret,
            true
        );

        $expectedSignature = $this->base64UrlEncode($signature);

        if ($base64Signature !== $expectedSignature) {
            return null;
        }

        // Decode payload
        $payload = json_decode($this->base64UrlDecode($base64Payload), true);

        // Check expiration
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            return null;
        }

        return $payload;
    }

    /**
     * Base64 URL encode
     */
    private function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    /**
     * Base64 URL decode
     */
    private function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}