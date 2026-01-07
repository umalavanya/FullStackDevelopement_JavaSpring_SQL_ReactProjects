SELECT name, type_desc, is_disabled
FROM sys.server_principals
WHERE type IN ('S', 'U', 'G'); -- SQL Login, Windows User, Windows Group
