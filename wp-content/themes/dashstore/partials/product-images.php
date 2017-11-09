<?php

/*-------Plumtree Custom product images output----------*/

	/* Variables */
	global $product;
	$slider_type = (dash_get_option('product_slider_type') != '') ? dash_get_option('product_slider_type') : 'slider-with-thumbs';
	$transition_type = (dash_get_option('product_slider_effect') != '') ? dash_get_option('product_slider_effect') : 'fade';
	$owl_transition_attr = ' data-owl-transition="'.$transition_type.'"';
	$attachment_ids = $product->get_gallery_attachment_ids();

	/* Extra data attribute for owl carousel & magnific popup */
	$extra_owl_attr = null;
	$extra_popup_attr = null;
	$extra_thumbs_owl_attr = null;
	switch ($slider_type) {
		case 'simple-slider':
			$extra_owl_attr = '" data-owl="container" data-owl-slides="1" data-owl-type="simple"'.$owl_transition_attr;
		break;
		case 'slider-with-popup':
			$extra_owl_attr = '" data-owl="container" data-owl-slides="1" data-owl-type="simple"'.$owl_transition_attr;
			$extra_popup_attr = ' data-magnific="container"';
		break;
		case 'slider-with-thumbs':
			$extra_owl_attr = '" data-owl="container" data-owl-slides="1" data-owl-type="with-thumbs"'.$owl_transition_attr;
			$extra_popup_attr = ' data-magnific="container"';
			$extra_thumbs_owl_attr = ' data-owl-thumbs="container"';
		break;
		case 'vertical-thumbs':
			$extra_owl_attr = ' vertical-thumbs" data-owl="container" data-owl-slides="1" data-owl-type="with-icons"'.$owl_transition_attr;
			$extra_popup_attr = ' data-magnific="container"';
		break;
	}

	/* Get product featured image */
	function dash_get_main_img($size, $main_slider, $slider_type){
		global $post, $woocommerce, $product;
		$main_image = '';

		if ( has_post_thumbnail() ) {

			

		} else {
			$main_image = apply_filters( 'woocommerce_single_product_image_html', sprintf( '<img src="%s" alt="Placeholder" />', woocommerce_placeholder_img_src() ), $post->ID );
		}
		return $main_image;
	}

	/* Get attachments */
	function dash_get_attachment_imgs($size, $main_slider, $slider_type){
		global $post, $woocommerce, $product;
		$attachment_ids = $product->get_gallery_attachment_ids();
		$gallery_imgs = '';

		if ($attachment_ids) {
			foreach ( $attachment_ids as $attachment_id ) {
				$image_link = wp_get_attachment_url( $attachment_id );
				$image = wp_get_attachment_image( $attachment_id, apply_filters( 'single_product_small_thumbnail_size', $size ), false, array( 'class' => 'lazyload' ) );
				$image_title = esc_attr( get_the_title( $attachment_id ) );

				if ($main_slider) {
					$gallery_imgs .= apply_filters( 'woocommerce_single_product_image_thumbnail_html', sprintf( '%s', $image ), $attachment_id );
				} else {
					$gallery_imgs .= apply_filters( 'woocommerce_single_product_image_thumbnail_html', sprintf( '%s', $image ), $attachment_id );
				}
			}
		}
		return $gallery_imgs;
	}
	$html_output = '';

	/* Output html(main slider) */
	$html_output .= '<div class="main-slider'.$extra_owl_attr.''.$extra_popup_attr.'>';
	$html_output .= dash_get_main_img('shop_single', true, $slider_type);
	$html_output .= dash_get_attachment_imgs('shop_single', true, $slider_type);
	$html_output .= '</div>';

	/* Output html(thumbs slider) */
	if ($slider_type == 'slider-with-thumbs' && $attachment_ids ) {
		$html_output .= '<div class="thumb-slider"'.$extra_thumbs_owl_attr.'>';
		$html_output .= dash_get_main_img('dash-single-product-thumbs', false, $slider_type);
		$html_output .= dash_get_attachment_imgs('dash-single-product-thumbs', false, $slider_type);
		$html_output .= '</div>';
	}

	echo $html_output;
