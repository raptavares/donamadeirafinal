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
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
 //Added by WP-Cache Manager
define('WP_CACHE', true); //Added by WP-Cache Manager
define( 'WPCACHEHOME', '/home/javali/webapps/donamadeira/wp-content/plugins/wp-super-cache/' ); //Added by WP-Cache Manager
define('DB_NAME', 'donamadeira');

/** MySQL database username */
define('DB_USER', 'donamadeira');

/** MySQL database password */
define('DB_PASSWORD', 'donamad2017');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'YI2CVxtcIfpeaUOGvgOPK8kLQwLFJusLza5edrSmYu0OwyWSoksb3oMseYXIpUvg');
define('SECURE_AUTH_KEY',  'XtGMsMimsFUvKGF4yx622btXFKWJRAHLXBsgXhNUpHGD2naDqQY1VApQtwAon3Cp');
define('LOGGED_IN_KEY',    'hh4EgpSVpHatCw6rcnSjLTSsOA5iZyLhhMrZ0rbdGApAqjAs4aSl3nnWdW7iWCIb');
define('NONCE_KEY',        'LQA4KzGwHSg6VV6Rc3G7ej7lxO1bB1hdCWqmCpUjfqbC2AbQgLXXeRGeGrF3ear3');
define('AUTH_SALT',        '2WjfHYsATIlqXreu2lm9zpHL1I2ZcGBkHGZcRQMUIFGpwdEDLVQJBed8ggLhsx6E');
define('SECURE_AUTH_SALT', '0wkQuXxxvCWRRLJU7Dn1lnFlD1rRu7sQ4Oc0iiOw6XdRzYa9ajwrOXvTMGswW7xL');
define('LOGGED_IN_SALT',   'R6Hz2pgqUoxv93qcqYPixL5QixbDr3FBVFQPLZW3rcu1gepXE3QAesqbhzqN7wjE');
define('NONCE_SALT',       'JOhxhde3TLYJHOVFWL7nlUBOkFccegcXhX6RmZ13G6TCoB5jzZZh2v5oC95PtUQa');

/**
 * Other customizations.
 */
define('FS_METHOD','direct');define('FS_CHMOD_DIR',0755);define('FS_CHMOD_FILE',0644);
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');

/**
 * Turn off automatic updates since these are managed upstream.
 */
define('AUTOMATIC_UPDATER_DISABLED', true);


/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
