<?php /* The template for displaying Archive pages */
get_header(); ?>

		<main class="site-content<?php if (function_exists('dash_main_content_class')) dash_main_content_class(); ?>" itemscope="itemscope" itemprop="mainContentOfPage"><!-- Main content -->

			<?php if ( function_exists('dash_output_page_title') ) dash_output_page_title(); ?>

			<?php if ( have_posts() ) {

				// Extra wrapper for blog posts
				if ( dash_get_option('blog_frontend_layout')=='grid' || dash_get_option('blog_frontend_layout')=='isotope' ) {
					if ( !is_woocommerce() ) { ?>
						<div class="blog-grid-wrapper row" data-isotope=container data-isotope-layout=masonry data-isotope-elements=post>
					<?php } else { ?>
						<div class="archive-pages-content">
				<?php } }

				// Start the Loop.
				while ( have_posts() ) : the_post();

					get_template_part( 'content', get_post_format() );

				endwhile;

				// Close Extra wrapper for blog posts
				if ( dash_get_option('blog_frontend_layout')=='grid' || dash_get_option('blog_frontend_layout')=='isotope' ) { echo "</div>"; }

				// Pagination
				if (dash_get_option('blog_frontend_layout')!=='isotope') {
					get_template_part( 'partials/pagination' );
				}

			} else {
				// If no content, include the "No posts found" template.
				get_template_part( 'content', 'none' );
			} ?>

		</main><!-- end of Main content -->

		<?php get_sidebar(); ?>

<?php get_footer(); ?>
