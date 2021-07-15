<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'techc_db' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '+3]Fr0 x(F5t)zIU^/&qjM@uw##Rb*u@ZWA/dlnHiynwfuKP:x5XG(f.6Uo1z?e]' );
define( 'SECURE_AUTH_KEY',  'zFZ,maP<Q~Q=vp@PEW<5ARif$?nJ$y[F<Zym9IXYO/MB1mtCi/X! w>8pGtscBZ/' );
define( 'LOGGED_IN_KEY',    's5hws}.84Q%74Q~0{.pm4bO=|u5TN*S=5^aRZ@~au83:3FK[:`BI1)=1@uk0)V})' );
define( 'NONCE_KEY',        'bnH9@>~cKx@nWkGh61hyH&pNB 762JC)Rg57~a3AXBhzKIk4|;>MVcA5?(Z>D>@/' );
define( 'AUTH_SALT',        '76.L kS.ELBtM/%`bxc GX aN{3diT;w`.}`9rK9#NY3)##3rglS$J_p0oZIO1Lo' );
define( 'SECURE_AUTH_SALT', 'QDvu(@+euez3dw7k?3z[},O 02:4j3HhCu*}pltPmog+dEM2mg4DxpXA)rh6]tq#' );
define( 'LOGGED_IN_SALT',   'jV4)UrR!ecSWK`>w&UF]`Edv(3@8j)c4,oH12?m[RVe^#>4B-*L_g j?-prB;;8e' );
define( 'NONCE_SALT',       '=P];5t`+Sa!E&|_IKCz)5{lq9Zv)02oA`?qwKvh&w*>EyTAVmA;O.DShq)_AK0^+' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
