<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
?>

<div class="nav-modal"><div class="nav-modal-inner"></div></div>

<header class="header clearfix" id="header" role="banner">

  <div class="header-secondary-menu">
    <?php print render($page['header_secondary_menu']); ?>
  </div>
  <div class="header__inner clearfix">

    <div class="header-logo">
      <h1 class="site-name"><a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" id="site-name-wrapper">SafeWork SA</a></h1>
    </div>

    <?php print render($page['header']); ?>

    <div class="header-search">
      <?php print render($page['header_search']); ?>
    </div>

  </div>

</header>

<?php
  // Render the sidebars to see if there's anything in them.
  $sidebar_first  = render($page['sidebar_first']);
  $sidebar_second = render($page['sidebar_second']);

  $has_sidebars = (($sidebar_first || $sidebar_second)) ? ' has-sidebars' : ' no-sidebars';
?>

<div id="page">
  <div class="content-header">
    <div class="banner-wrapper">
      <div class="breadcrumb-wrapper">
        <?php print $breadcrumb; ?>
      </div>
      <?php print render($page['highlighted']); ?>
    </div>
  </div>
  <div id="main" role="main" class="<?php echo $has_sidebars; ?>">

    <?php
      // Block for print content
    ?>
    <div class="show-on-print">
      <p><img src="<?php print '/' . path_to_theme(); ?>/images/logo.png" alt="SafeWork SA" /></p>
      <?php print $breadcrumb; ?>

    </div>

    <div class="title-wrapper" class="column">
      <a href="#skip-link" id="skip-content" class="element-invisible">Go to top of page</a>

      <a id="main-content"></a>
      <?php print $messages; ?>
      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
    </div>

    <div id="content" class="column">
      <?php print render($tabs); ?>
      <?php print render($page['help']); ?>
      <?php if ($action_links): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
      <?php print $feed_icons; ?>
    </div>

    <?php if (($sidebar_first || $sidebar_second) && !$is_front ) : ?>
      <aside class="sidebars" role="complementary">
        <?php print $sidebar_first; ?>
        <?php print $sidebar_second; ?>
      </aside>
    <?php endif; ?>

  </div>

  <?php print render($page['footer']); ?>

</div>

<?php if ($page['bottom']) : ?>
<div class="page-bottom-wrapper">
  <?php print render($page['bottom']); ?>
</div>
<?php endif; ?>

<div id="mobile-menu">
  <?php print render($page['mobile_menu']); ?>
</div>
