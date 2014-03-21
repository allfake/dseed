<?php if ($slides): ?>
<ul class="rslides" id="rslides-<?php print $view->name ?>-<?php print $view->current_display ?>">
  <?php foreach ($slides as $slide): ?>
  <li><?php print $slide ?></li>
  <?php endforeach; ?>
</ul>
<?php endif; ?>
