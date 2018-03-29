<<?php print $layout_wrapper; print $layout_attributes; ?> class="<?php print $classes;?> clearfix">

  <?php if (isset($title_suffix['contextual_links'])): ?>
  <?php print render($title_suffix['contextual_links']); ?>
  <?php endif; ?>
  
  <<?php print $top_wrapper ?> class="ds-top<?php print $top_classes; ?>">
    <?php print $top; ?>
  </<?php print $top_wrapper ?>>
  
  <<?php print $middle_wrapper ?> class="ds-middle<?php print $middle_classes; ?>">
    <?php print $middle; ?>
  </<?php print $middle_wrapper ?>>
  
  <<?php print $bottom_wrapper ?> class="ds-bottom<?php print $bottom_classes; ?>">
    <?php print $bottom; ?>
  </<?php print $bottom_wrapper ?>>
  
</<?php print $layout_wrapper ?>>
  
<?php if (!empty($drupal_render_children)): ?>
  <?php print $drupal_render_children ?>
<?php endif; ?>